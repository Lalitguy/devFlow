import { auth } from "@/auth";
import QuestionForm from "@/components/forms/QuestionForm";
import ROUTES from "@/constants/routes";
import { getQuestion } from "@/lib/actions/question.action";
import { notFound, redirect } from "next/navigation";
import React from "react";

const EditQuestion = async ({ params }: RouteParams) => {
  const { id } = await params;
  if (!id) notFound();

  const session = await auth();
  if (!session) redirect(ROUTES.SIGN_IN);

  const { data: question, success } = await getQuestion({ questionId: id });

  if (!success) notFound();

  if (question?.author.toString() !== session?.user?.id)
    redirect(ROUTES.QUESTION(id));

  return (
    <>
      <div className="mt-9">
        <QuestionForm question={question} isEdit />
      </div>
    </>
  );
};

export default EditQuestion;
