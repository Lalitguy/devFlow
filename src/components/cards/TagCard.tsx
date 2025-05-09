import ROUTES from "@/constants/routes";
import Link from "next/link";
import React, { MouseEvent } from "react";
import { Badge } from "../ui/badge";
import { getDeviconClassName } from "@/lib/utils";
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
      <Link href={ROUTES.TAGS(_id)} className={"flex justify-between gap-2"}>
        {Content}
      </Link>
    );
  }
};

export default TagCard;
