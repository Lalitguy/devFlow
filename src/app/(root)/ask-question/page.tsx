import QuestionForm from "@/components/forms/QuestionForm";
import React from "react";

const AskQuestionn = () => {
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
