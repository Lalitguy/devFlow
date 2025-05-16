"use client";

import React, { useState } from "react";
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

interface JobsFilterProps {
  countriesList: Country[];
}

const JobsFilter = ({ countriesList }: JobsFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
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

    router.push(newUrl, { scroll: false });
  };

  const resetFilters = () => {
    setValue("");
    setKey((prev) => prev + 1);

    const newUrl = removeUrlQuery({
      params: searchParams.toString(),
      keysToRemove: ["location"],
    });

    router.push(newUrl, { scroll: false });
  };

  return (
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
              <SelectItem value="No results found">No results found</SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      {searchParams.get("location") && (
        <XIcon className="mr-2 size-6 cursor-pointer" onClick={resetFilters} />
      )}
    </div>
  );
};

export default JobsFilter;
