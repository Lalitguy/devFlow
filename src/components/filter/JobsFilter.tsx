"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery, removeUrlQuery } from "@/lib/url";
import { XIcon } from "lucide-react";
import LocalSearch from "../search/LocalSearch";
import { Skeleton } from "../ui/skeleton";

interface JobsFilterProps {
  countriesList: Country[];
}

const JobsFilter = ({ countriesList }: JobsFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState<string | undefined>("");
  const [key, setKey] = useState<number>(0);

  const handleUpdateParams = (value: string) => {
    setValue(value);
    setKey((prev) => prev + 1);
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "location",
      value,
    });

    startTransition(() => {
      router.push(newUrl, { scroll: false });
    });
  };

  const resetFilters = () => {
    setValue("");
    setKey((prev) => prev + 1);

    const newUrl = removeUrlQuery({
      params: searchParams.toString(),
      keysToRemove: ["location"],
    });

    startTransition(() => {
      router.push(newUrl, { scroll: false });
    });
  };

  return (
    <>
      <div className="relative flex max-sm:flex-col justify-between sm:items-center gap-5 mt-11 w-full">
        <LocalSearch
          route={pathname}
          iconPosition="left"
          imgSrc="/icons/job-search.svg"
          placeholder="Job Title, Company, or Keywords"
          otherClasses="flex-1 max-sm:w-full"
        />

        <Select
          key={key}
          onValueChange={(value) => handleUpdateParams(value)}
          value={value || undefined}
        >
          <SelectTrigger className="!flex flex-row items-center gap-3 p-4 border light-border sm:max-w-[250px] min-h-[56px] text-dark500_light700 line-clamp-1 body-regular background-light800_dark300 no-focus">
            <Image
              src="/icons/carbon-location.svg"
              alt="location"
              width={18}
              height={18}
            />
            <div className="flex-1 text-left line-clamp-1">
              <SelectValue placeholder="Select Location" />
            </div>
          </SelectTrigger>

          <SelectContent className="max-w-[250px] max-h-[350px] body-semibold background-light900_dark200">
            <SelectGroup>
              {countriesList ? (
                countriesList.map((country: Country) => (
                  <SelectItem
                    key={country.name.common}
                    value={country.name.common}
                    className="px-4 py-3"
                  >
                    {country.name.common}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="No results found">
                  No results found
                </SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        {!isPending && searchParams.get("location") && (
          <XIcon
            className="mr-2 size-6 cursor-pointer"
            onClick={resetFilters}
          />
        )}
      </div>

      {isPending && (
        <div className="top-[100px] z-10 absolute inset-0 flex flex-col gap-9 bg-light-850 dark:bg-dark-100 mt-9 w-full h-fit min-h-[100vh]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
            <Skeleton
              key={item}
              className="relative rounded-2xl w-full h-48 background-light900_dark200"
            >
              <Skeleton className="top-10 left-6 absolute opacity-45 w-28 h-20 background-dark400_light900" />
              <Skeleton className="right-6 bottom-6 absolute bg-primary-500 opacity-25 w-28 h-8" />
            </Skeleton>
          ))}
        </div>
      )}
    </>
  );
};

export default JobsFilter;
