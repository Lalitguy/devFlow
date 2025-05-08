import { auth } from "@/auth";
import QuestionForm from "@/components/forms/QuestionForm";
import ROUTES from "@/constants/routes";
import { redirect } from "next/navigation";
import React from "react";

const AskQuestionn = async () => {
  const session = await auth();

  if (!session) redirect(ROUTES.SIGN_IN);

  return (
    <>
      <h1 className="text-dark100_light900 h1-bold">Ask a question</h1>

      <div className="mt-9">
        <QuestionForm />
      </div>
    </>
  );
};

export default AskQuestionn;
