"use client";

import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { globalSearch } from "@/lib/actions/general.action";
import GlobalFilter from "./filter/GlobalFilter";
import handleError from "@/lib/handlers/error";

const GlobalResult = () => {
  const searchParams = useSearchParams();

  const [result, setResult] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const global = searchParams.get("global");
  const type = searchParams.get("type");

  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setLoading(true);

      try {
        const res = await globalSearch({
          query: global as string,
          type,
        });

        setResult(res.data);
      } catch (error) {
        handleError(error);
        setResult([]);
      } finally {
        setLoading(false);
      }
    };

    if (global) {
      fetchResult();
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
        return `/questions/${id}`;
      case "answer":
        return `/questions/${id}`;
      case "user":
        return `/profile/${id}`;
      case "tag":
        return `/tags/${id}`;
      default:
        return "/";
    }
  };

  return (
    <div className="top-full z-10 absolute bg-light-800 dark:bg-dark-400 shadow-sm mt-3 py-5 rounded-xl w-full">
      <GlobalFilter />
      <div className="bg-light-700/50 dark:bg-dark-500/50 my-5 h-[1px]" />

      <div className="space-y-5">
        <p className="px-5 text-dark400_light900 paragraph-semibold">
          Top Match
        </p>

        {isLoading ? (
          <div className="flex-col flex-center px-5">
            <ReloadIcon className="my-2 w-10 h-10 text-primary-500 animate-spin" />
            <p className="text-dark200_light800 body-regular">
              Browsing the whole database..
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {result?.length > 0 ? (
              result?.map((item: GlobalSearchedItem, index) => (
                <Link
                  href={renderLink(item.type, item.id)}
                  key={item.type + item.id + index}
                  className="flex items-start gap-3 hover:bg-light-700/50 dark:hover:bg-dark-500/50 px-5 py-2.5 w-full cursor-pointer"
                >
                  <Image
                    src="/icons/tag.svg"
                    alt="tags"
                    width={18}
                    height={18}
                    className="invert-colors mt-1 object-contain"
                  />

                  <div className="flex flex-col">
                    <p className="text-dark200_light800 line-clamp-1 body-medium">
                      {item.title}
                    </p>
                    <p className="mt-1 font-bold text-light400_light500 capitalize small-medium">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-col flex-center px-5">
                <p className="text-5xl">🫣</p>
                <p className="px-5 py-2.5 text-dark200_light800 body-regular">
                  Oops, no results found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
