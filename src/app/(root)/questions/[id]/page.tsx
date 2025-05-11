import AllAnswers from "@/components/answers/AllAnswers";
import TagCard from "@/components/cards/TagCard";
import Preview from "@/components/editor/Preview";
import AnswerForm from "@/components/forms/AnswerForm";
import Metric from "@/components/Metric";
import SaveQuestion from "@/components/SaveQuestion";
import UserAvatar from "@/components/UserAvatar";
import Votes from "@/components/Votes";
import ROUTES from "@/constants/routes";
import { getAnswers } from "@/lib/actions/answer.action";
import { hasSavedQuestion } from "@/lib/actions/collection.action";
import { getQuestion, incrementViews } from "@/lib/actions/question.action";
import { hasVoted } from "@/lib/actions/vote.action";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { after } from "next/server";
import React, { Suspense } from "react";

const QuestionDetails = async ({ params, searchParams }: RouteParams) => {
  const { id } = await params;
  const {
    success,
    error,
    data: question,
  } = await getQuestion({ questionId: id });

  after(async () => await incrementViews({ questionId: id }));

  if (!success || !question || error) return redirect("/404");
  const {
    author,
    title,
    createdAt,
    answers,
    views,
    tags,
    content,
    upvotes,
    downvotes,
  } = question || {};

  const { page, pageSize, filter } = await searchParams;
  const {
    success: areAnswersLoaded,
    data: answersData,
    error: answersError,
  } = await getAnswers({
    questionId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    filter,
  });

  const hasSavedQuestionPromise = hasSavedQuestion({
    questionId: id,
  });

  const hasVotedPromise = hasVoted({
    targetId: id,
    targetType: "question",
  });

  return (
    <>
      <div className="flex-col flex-start w-full">
        <div className="flex flex-row justify-between w-full">
          <div className="flex justify-start items-center gap-1">
            <UserAvatar
              id={author._id}
              name={author.name}
              fallbackAvatarClassName="text-[12px]"
              className="size-[24px]"
            />
            <Link href={ROUTES.PROFILE(author._id)}>
              <p className="text-dark300_light700 paragraph-semibold">
                {author.name}
              </p>
            </Link>
          </div>
          <div className="flex justify-end items-center gap-6">
            <Suspense fallback={<div>Loading...</div>}>
              <Votes
                upvotes={upvotes}
                downvotes={downvotes}
                targetType="question"
                targetId={question._id}
                hasVotedPromise={hasVotedPromise}
              />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <SaveQuestion
                questionId={id}
                hasSavedQuestionPromise={hasSavedQuestionPromise}
              />
            </Suspense>
          </div>
        </div>

        <h2 className="mt-3.5 w-full text-dark200_light900 h2-semibold">
          {title}
        </h2>
      </div>

      <div className="flex flex-wrap gap-5 mt-5 mb-8">
        <Metric
          imgUrl="/icons/clock.svg"
          value={`Asked ${getTimeStamp(new Date(createdAt))}`}
          textStyles=" small-regular text-dark400_light700"
          alt="Clock icon"
        />
        <Metric
          imgUrl="/icons/message.svg"
          value={answers}
          textStyles=" small-regular text-dark400_light700"
          alt="Clock icon"
        />
        <Metric
          imgUrl="/icons/eye.svg"
          value={formatNumber(views)}
          textStyles=" small-regular text-dark400_light700"
          alt="Clock icon"
        />
      </div>
      <Preview content={content} />

      <div className="flex flex-wrap gap-2 mt-8">
        {tags.map((tag) => (
          <TagCard key={tag._id} name={tag.name} _id={tag._id} />
        ))}
      </div>

      <section className="my-5">
        <AllAnswers
          data={answersData?.answers}
          success={areAnswersLoaded}
          error={answersError}
          totalAnswers={answersData?.totalAnswers || 0}
          page={Number(page) || 1}
          isNext={answersData?.isNext || false}
        />
      </section>
      <section className="my-5">
        <AnswerForm
          questionId={id}
          questionTitle={title}
          questionContent={content}
        />
      </section>
    </>
  );
};

export default QuestionDetails;
