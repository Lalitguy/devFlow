"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeUrlQuery } from "@/lib/url";

import GlobalResult from "../GlobalResult";

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("global");

  const [search, setSearch] = useState(query || "");
  const [isOpen, setIsOpen] = useState(query || false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        // @ts-expect-error Property 'contains' does not exist on type 'EventTarget | null'.
        !searchContainerRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["global", "type"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, pathname, router, searchParams, query]);

  return (
    <div
      className="max-lg:hidden relative w-full max-w-[600px]"
      ref={searchContainerRef}
    >
      <div className="relative flex items-center gap-1 px-4 rounded-xl min-h-[56px] background-light800_darkgradient grow">
        <Image
          src="/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />

        <Input
          type="text"
          placeholder="Search anything globally..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
            if (e.target.value === "" && isOpen) setIsOpen(false);
          }}
          className="shadow-none border-none outline-none text-dark400_light700 paragraph-regular no-focus placeholder"
        />
      </div>
      {isOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
