import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/https-error";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const users = await User.find();

    return NextResponse.json(
      {
        data: users,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}

//Create User
export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();

    const validateData = UserSchema.safeParse(body);

    if (!validateData.success) {
      throw new ValidationError(validateData.error.flatten().fieldErrors);
    }

    const { username, email } = validateData.data;

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      throw new Error("Username already exists");
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      throw new Error("Email already exists");
    }

    const newUser = await User.create(validateData.data);

    return NextResponse.json({ data: newUser, success: true }, { status: 201 });
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
