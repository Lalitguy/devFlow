"use client";

import React from "react";
import { Button } from "./ui/button";
import { formUrlQuery } from "@/lib/url";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number | undefined | string;
  isNext: boolean | undefined;
  containerClasses?: string;
}
const Pagination = ({
  page = 1,
  isNext,
  containerClasses,
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (type: "prev" | "next") => {
    const nextPageNumber =
      type === "prev" ? Number(page) - 1 : Number(page) + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center gap-2 mt-5",
        containerClasses
      )}
    >
      {/* Previous Page Button */}
      {Number(page) > 1 && (
        <Button
          onClick={() => handleNavigation("prev")}
          className="flex justify-center items-center gap-2 border light-border-2 min-h-[36px] btn"
        >
          <p className="text-dark200_light800 body-medium">Prev</p>
        </Button>
      )}

      <div className="flex justify-center items-center bg-primary-500 px-3.5 py-2 rounded-md">
        <p className="text-light-900 body-semibold">{page}</p>
      </div>

      {/* Next Page Button */}
      {isNext && (
        <Button
          onClick={() => handleNavigation("next")}
          className="flex justify-center items-center gap-2 border light-border-2 min-h-[36px] btn"
        >
          <p className="text-dark200_light800 body-medium">Next</p>
        </Button>
      )}
    </div>
  );
};

export default Pagination;
