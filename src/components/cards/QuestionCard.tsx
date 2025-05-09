import React from "react";

interface QuestionCardProps {
  question: QuestionProps;
}
import Link from "next/link";

import ROUTES from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";

import Metric from "../Metric";
import TagCard from "./TagCard";
const QuestionCard = ({
  question: { _id, title, tags, author, createdAt, upvotes, answers, views },
}: QuestionCardProps) => {
  return (
    <div className="p-9 sm:px-11 rounded-[10px] card-wrapper">
      <div className="flex sm:flex-row flex-col-reverse justify-between gap-5">
        <div className="flex-1">
          <span className="sm:hidden flex text-dark400_light700 line-clamp-1 subtle-regular">
            {getTimeStamp(createdAt)}
          </span>

          <Link href={ROUTES.QUESTION(_id)}>
            <h3 className="flex-1 text-dark200_light900 line-clamp-1 sm:h3-semibold base-semibold">
              {title}
            </h3>
          </Link>
        </div>

        {/* {showActionBtns && <EditDeleteAction type="Question" itemId={_id} />} */}
      </div>

      <div className="flex flex-wrap gap-2 mt-3.5 w-full">
        {tags.map((tag: Tag) => (
          <TagCard key={tag._id} _id={tag._id} name={tag.name} compact />
        ))}
      </div>

      <div className="flex-wrap flex-between gap-3 mt-6 w-full">
        <Metric
          imgUrl={author.image || "/icons/avatar.svg"}
          alt={author.name || "avatar"}
          value={author.name}
          title={`• asked ${getTimeStamp(createdAt)}`}
          href={ROUTES.PROFILE(author._id)}
          textStyles="body-medium text-dark400_light700"
          isAuthor
          titleStyles="max-sm:hidden"
        />

        <div className="flex max-sm:flex-wrap max-sm:justify-start items-center gap-3">
          <Metric
            imgUrl="/icons/like.svg"
            alt="like"
            value={upvotes}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/icons/message.svg"
            alt="answers"
            value={answers}
            title=" Answers"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/icons/eye.svg"
            alt="views"
            value={views}
            title=" Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
