import ROUTES from "@/constants/routes";
import Link from "next/link";
import React, { MouseEvent } from "react";
import { Badge } from "../ui/badge";
import { cn, getDeviconClassName, getTechDescription } from "@/lib/utils";
import Image from "next/image";

interface TagProps {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  handleRemove?: () => void;
  isButton?: boolean;
}

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  compact = true,
  remove,
  isButton,
  handleRemove,
}: TagProps) => {
  const iconClass = getDeviconClassName(name);
  const iconDescription = getTechDescription(name);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
  };

  const Content = (
    <>
      <Badge className="flex gap-2 px-4 py-2 border-none rounded-md text-light400_light500 subtle-regular background-light800_dark300">
        <div className="flex-center space-x-2">
          {compact && <i className={iconClass} />}
          <span>{name}</span>
        </div>

        {remove && (
          <Image
            src={"/icons/close.svg"}
            alt="remove"
            width={12}
            height={12}
            className="dark:invert invert-0 object-contain cursor-pointer"
            onClick={handleRemove}
          />
        )}
      </Badge>

      {showCount && questions && (
        <p className="text-dark500_light700 small-medium">{questions}</p>
      )}
    </>
  );

  if (compact) {
    return isButton ? (
      <button onClick={handleClick} className="flex justify-between gap-2">
        {Content}
      </button>
    ) : (
      <Link href={ROUTES.TAG(_id)} className={"flex justify-between gap-2"}>
        {Content}
      </Link>
    );
  }
  return (
    <Link href={ROUTES.TAG(_id)} className="shadow-light100_darknone">
      <article className="flex flex-col px-8 py-10 border light-border rounded-2xl w-full sm:w-[255px] background-light900_dark200">
        <div className="flex justify-between items-center gap-3">
          <div className="px-5 py-1.5 rounded-sm w-fit background-light800_dark400">
            <p className="text-dark300_light900 paragraph-semibold">{name}</p>
          </div>
          <i className={cn(iconClass, "text-2xl")} aria-hidden="true" />
        </div>
        <p className="mt-5 w-full text-dark500_light700 line-clamp-3 small-regular">
          {iconDescription}
        </p>
        <p className="mt-3.5 text-dark400_light500 small-medium">
          <span className="mr-2.5 primary-text-gradient body-semibold">
            {questions}+
          </span>
          Questions
        </p>
      </article>
    </Link>
  );
};

export default TagCard;
