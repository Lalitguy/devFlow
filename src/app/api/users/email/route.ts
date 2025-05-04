//POST /api/users/email

import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/https-error";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) throw new NotFoundError("Email");

  const validatedData = UserSchema.partial().safeParse({ email });

  if (!validatedData.success) {
    throw new ValidationError(validatedData.error.flatten().fieldErrors);
  }

  try {
    await dbConnect();

    const user = await User.findOne({ email });
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
