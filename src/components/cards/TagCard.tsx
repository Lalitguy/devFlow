import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { getDeviconClassName } from "@/lib/utils";

interface TagProps {
  _id: string;
  name: string;
  questions: number;
  showCount?: boolean;
  compact?: boolean;
}

const TagCard = ({ _id, name, questions, showCount, compact }: TagProps) => {
  const iconClass = getDeviconClassName(name);
  return (
    <Link href={ROUTES.TAGS(_id)} className={"flex justify-between gap-2"}>
      <Badge className="px-4 py-2 border-none rounded-md text-light400_light500 subtle-regular background-light800_dark300">
        <div className="flex-center space-x-2">
          {compact && <i className={iconClass} />}
          <span>{name}</span>
        </div>
      </Badge>

      {showCount && (
        <p className="text-dark500_light700 small-medium">{questions}</p>
      )}
    </Link>
  );
};

export default TagCard;
