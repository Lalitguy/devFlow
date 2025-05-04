import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/https-error";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

//GET /api/users/[id]
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) throw new NotFoundError("User ID");

  try {
    await dbConnect();

    const user = await User.findById(id);

    if (!user) throw new NotFoundError("User");

    return NextResponse.json(
      {
        data: user,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}

//Delete /api/users/[id]
export async function DELTE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) throw new NotFoundError("User ID");

  try {
    await dbConnect();

    const user = await User.findByIdAndDelete(id);

    if (!user) throw new NotFoundError("User");

    return NextResponse.json(
      {
        data: user,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}

//PUT /api/users/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) throw new NotFoundError("User ID");

  const reqBody = await request.json();
  const validateData = UserSchema.partial().safeParse(reqBody);

  if (!validateData.success) {
    throw new ValidationError(validateData.error.flatten().fieldErrors);
  }
  try {
    await dbConnect();
    const updatedUser = await User.findByIdAndUpdate(id, validateData.data, {
      new: true,
    });
    if (!updatedUser) throw new NotFoundError("User");

    return NextResponse.json(
      {
        success: true,
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
