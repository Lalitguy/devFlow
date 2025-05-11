import React, { Suspense } from "react";
import UserAvatar from "../UserAvatar";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { cn, getTimeStamp } from "@/lib/utils";
import Preview from "../editor/Preview";
import Votes from "../Votes";
import { hasVoted } from "@/lib/actions/vote.action";

interface AnswerCardProps extends Answer {
  containerClasses?: string;
  showReadMore?: boolean;
}
const AnswerCard = ({
  _id,
  author,
  content,
  createdAt,
  upvotes,
  downvotes,
  question,
  containerClasses = "",
  showReadMore = false,
}: AnswerCardProps) => {
  const hasVotedPromise = hasVoted({
    targetType: "answer",
    targetId: _id,
  });

  return (
    <article className={cn("py-10 light-border border-b", containerClasses)}>
      <span id={`answer-${_id}`} className="hash-span" />

      <div className="flex flex-row sm:flex-row justify-between sm:items-center gap-5 sm:gap-2 mb-5">
        <div className="flex items-start sm:items-center gap-1 felx-1">
          <UserAvatar
            id={author._id}
            name={author.name}
            imageUrl={author.image}
            className="max-sm:mt-2 rounded-full size-5 object-cover"
          />
          <Link
            href={ROUTES.PROFILE(author._id)}
            className="flex sm:flex-row flex-col sm:items-center max-sm:ml-1"
          >
            <p className="text-dark300_light700 body-semibold">
              {author.name ?? "Anonymous "}
            </p>

            <p className="mt-0.5 ml-0.5 text-light400_light500 line-clamp-1 small-regular">
              <span className="max-sm:hidden"> • </span>
              answered {getTimeStamp(new Date(createdAt))}
            </p>
          </Link>
        </div>

        <div className="flex justify-end">
          <Suspense fallback={<div>Loading...</div>}>
            <Votes
              upvotes={upvotes}
              downvotes={downvotes}
              targetType="answer"
              targetId={_id}
              hasVotedPromise={hasVotedPromise}
            />
          </Suspense>
        </div>
      </div>
      <Preview content={content} />

      {showReadMore && (
        <Link
          href={`/questions/${question}#answer-${_id}`}
          className="z-10 relative font-space-grotesk text-primary-500 body-semibold"
        >
          <p className="mt-1 text-right">Read more</p>
        </Link>
      )}
    </article>
  );
};

export default AnswerCard;
