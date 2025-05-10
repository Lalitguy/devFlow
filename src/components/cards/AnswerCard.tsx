import React from "react";
import UserAvatar from "../UserAvatar";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";
import Preview from "../editor/Preview";

const AnswerCard = ({ _id, author, content, createdAt }: Answer) => {
  return (
    <article className="py-10 light-border border-b">
      <span id={JSON.stringify(_id)} className="hash-span" />

      <div className="flex sm:flex-row flex-col-reverse justify-between sm:items-center gap-5 sm:gap-2 mb-5">
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

        <div className="flex justify-end">Votes</div>
      </div>
      <Preview content={content} />
    </article>
  );
};

export default AnswerCard;
