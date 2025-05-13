import { Interaction } from "@/database";
import handleError from "../handlers/error";
import { CreateInteractionSchema } from "../validations";
import mongoose from "mongoose";
import action from "../handlers/action";
import { IInteractionDoc } from "@/database/interaction.model";

export const createInteraction = async (
  params: CreateInteractionParams
): Promise<ActionResponse<IInteractionDoc>> => {
  const validatedResult = await action({
    params,
    schema: CreateInteractionSchema,
    authorize: true,
  });

  if (validatedResult instanceof Error) {
    return handleError(validatedResult) as ErrorResponse;
  }

  const userId = validatedResult.session!.user!.id!;

  const session = await mongoose.startSession();
  session.startTransaction();

  const { action: actionType, actionId, actionTarget, authorId } = params;

  try {
    const [interaction] = await Interaction.create(
      [
        {
          user: userId,
          action: actionType,
          actionId,
          actionTarget,
          author: authorId,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    return { success: true, data: JSON.parse(JSON.stringify(interaction)) };
  } catch (error) {
    session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
};
