"use client";

import React, { useEffect } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeUrlQuery } from "@/lib/url";
interface LocalSearchProps {
  imgSrc?: string;
  route: string;
  placeholder: string;
  otherClasses?: string;
  iconPosition?: "left" | "right";
}
const LocalSearch = ({
  imgSrc = "/icons/search.svg",
  route,
  placeholder,
  otherClasses = "",
  iconPosition = "left",
}: LocalSearchProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = React.useState<string>(query);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: searchQuery,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathName === route) {
          const newUrl = removeUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["query"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, router, searchParams, pathName, route]);

  return (
    <div
      className={`flex items-center gap-4 px-4 rounded-[10px] min-h-[56px] background-light800_darkgradient grow ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        value={searchQuery}
        className="shadow-none border-none outline-none text-dark400_light700 paragraph-regular no-focus placeholder"
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          width={16}
          height={16}
          alt="search"
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearch;
