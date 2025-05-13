"use server";

import { Answer, Question } from "@/database";
import Vote from "@/database/vote.model";
import mongoose, { ClientSession } from "mongoose";
import action from "../handlers/action";
import handleError from "../handlers/error";
import {
  CreateVoteSchema,
  HasVotedSchema,
  UpdateVoteCountSchema,
} from "../validations";
import ROUTES from "@/constants/routes";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { createInteraction } from "./interaction.action";

async function updateVoteCount(
  params: UpdateVoteCountParams,
  session?: ClientSession
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: UpdateVoteCountSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { targetId, targetType, voteType, change } = validationResult.params!;

  const Model = targetType === "question" ? Question : Answer;
  const voteField = voteType === "upvote" ? "upvotes" : "downvotes";

  try {
    const result = await Model.findByIdAndUpdate(
      targetId,
      { $inc: { [voteField]: change } },
      { new: true, session }
    );

    if (!result) throw new Error("Failed to update vote count");

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export const createVote = async (
  params: CreateVoteParams
): Promise<ActionResponse> => {
  const validatedData = await action({
    params,
    schema: CreateVoteSchema,
    authorize: true,
  });

  if (validatedData instanceof Error) {
    return handleError(validatedData) as ErrorResponse;
  }

  const { targetId, targetType, voteType } = validatedData.params!;
  const userId = validatedData.session?.user?.id;

  if (!userId) {
    return handleError("User not authenticated") as ErrorResponse;
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingVote = await Vote.findOne({
      author: userId,
      targetId,
      targetType,
    }).session(session);

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        // If user is voting again with the same vote type, remove the vote
        await Vote.deleteOne({ _id: existingVote._id }).session(session);
        await updateVoteCount(
          {
            targetId,
            targetType,
            voteType,
            change: -1,
          },
          session
        );
      } else {
        // If user is changing their vote, update voteType and adjust counts
        await Vote.findByIdAndUpdate(
          existingVote._id,
          { voteType },
          { new: true, session }
        );
        await updateVoteCount(
          {
            targetId,
            targetType,
            voteType: existingVote.voteType,
            change: -1,
          },
          session
        );
        await updateVoteCount(
          {
            targetId,
            targetType,
            voteType,
            change: 1,
          },
          session
        );
      }
    } else {
      // First-time vote creation
      await Vote.create(
        [
          {
            author: userId,
            targetId,
            targetType,
            voteType,
          },
        ],
        { session }
      );
      await updateVoteCount(
        {
          targetId,
          targetType,
          voteType,
          change: 1,
        },
        session
      );
    }

    const Model = targetType === "question" ? Question : Answer;

    const contentDoc = await Model.findById(targetId).session(session);

    if (!contentDoc) throw new Error("Content not found");

    const contentAuthorId = contentDoc.author.toString();

    after(async () => {
      await createInteraction({
        action: voteType,
        actionId: targetId,
        authorId: contentAuthorId,
        actionTarget: targetType,
      });
    });
    await session.commitTransaction();
    session.endSession();

    //this revalidates for question too, becasue answers are declared in same route - question/[id]
    //So as [id] is dynamic - router question/[anything] page is revalidated
    revalidatePath(ROUTES.QUESTION(targetId));
    return { success: true };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};

export async function hasVoted(
  params: HasVotedParams
): Promise<ActionResponse<HasVotedResponse>> {
  const validationResult = await action({
    params,
    schema: HasVotedSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { targetId, targetType } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  try {
    const vote = await Vote.findOne({
      author: userId,
      targetId,
      targetType,
    });

    if (!vote)
      return {
        success: true,
        data: {
          hasUpvoted: false,
          hasDownvoted: false,
        },
      };
    return {
      success: true,
      data: {
        hasUpvoted: vote.voteType === "upvote",
        hasDownvoted: vote.voteType === "downvote",
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
