import React from "react";
import DataRenderer from "../DataRenderer";
import { EMPTY_ANSWERS } from "@/constants/states";
import AnswerCard from "../cards/AnswerCard";

interface AllAnswersProps extends ActionResponse<Answer[]> {
  totalAnswers: number;
}
const AllAnswers = ({
  data,
  success,
  error,
  totalAnswers,
}: AllAnswersProps) => {
  return (
    <div className="mt-11">
      <div className="flex justify-between items-center">
        <h3 className="primary-text-gradient">
          {totalAnswers}
          {totalAnswers === 1 ? " Answer" : " Answers"}
        </h3>
        <span>filter</span>
      </div>

      <DataRenderer
        success={success}
        error={error}
        data={data}
        empty={EMPTY_ANSWERS}
        render={(answers) =>
          answers.map(({ _id, author, content, createdAt }) => (
            <AnswerCard
              key={_id}
              _id={_id}
              author={author}
              content={content}
              createdAt={createdAt}
            />
          ))
        }
      />
    </div>
  );
};

export default AllAnswers;
