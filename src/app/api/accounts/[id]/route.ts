import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/https-error";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

//GET /api/accounts/[id]
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) throw new NotFoundError("Account ID");

  try {
    await dbConnect();

    const account = await Account.findById(id);

    if (!account) throw new NotFoundError("Account");

    return NextResponse.json(
      {
        data: account,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}

//Delete /api/accounts/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) throw new NotFoundError("Account ID");

  try {
    await dbConnect();

    const account = await Account.findByIdAndDelete(id);

    if (!account) throw new NotFoundError("Account");

    return NextResponse.json(
      {
        data: account,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}

//PUT /api/accounts/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) throw new NotFoundError("Account ID");

  const reqBody = await request.json();
  const validateData = AccountSchema.partial().safeParse(reqBody);

  if (!validateData.success) {
    throw new ValidationError(validateData.error.flatten().fieldErrors);
  }
  try {
    await dbConnect();
    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      validateData.data,
      {
        new: true,
      }
    );

    if (!updatedAccount) throw new NotFoundError("Account");

    return NextResponse.json(
      {
        success: true,
        data: updatedAccount,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
