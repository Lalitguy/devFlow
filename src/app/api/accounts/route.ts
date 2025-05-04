import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { ForbiddenError, ValidationError } from "@/lib/https-error";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

//Get All Accounts
export async function GET() {
  try {
    await dbConnect();

    const accounts = await Account.find();

    return NextResponse.json(
      {
        data: accounts,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}

//Create Account
export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();

    const validateData = AccountSchema.safeParse(body);

    if (!validateData.success)
      throw new ValidationError(validateData.error.flatten().fieldErrors);

    const existingAccount = await Account.findOne({
      provider: validateData.data.provider,
      providerAccountId: validateData.data.providerAccountId,
    });

    if (existingAccount) throw new ForbiddenError("Account already exists");

    const newAccount = await Account.create(validateData.data);

    return NextResponse.json(
      { data: newAccount, success: true },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
