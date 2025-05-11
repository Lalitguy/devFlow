import TagCard from "@/components/cards/TagCard";
import DataRenderer from "@/components/DataRenderer";
import CommonFilter from "@/components/filter/CommonFilter";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { TagFilters } from "@/constants/filters";
import ROUTES from "@/constants/routes";
import { EMPTY_TAGS } from "@/constants/states";
import { getTags } from "@/lib/actions/tag.action";
import React from "react";

const Tags = async ({ searchParams }: RouteParams) => {
  const { page, pageSize, query, filter } = await searchParams;
  const { success, data, error } = await getTags({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  if (!success) return;

  const { tags, isNext } = data || {};

  return (
    <>
      <h1 className="text-dark100_light900 text-3xl h1-bold">Tags</h1>

      <div className="flex max-sm:flex-col justify-between sm:items-center gap-5 mt-11">
        <LocalSearch route={ROUTES.TAGS} placeholder="Search by tag name..." />
        <CommonFilter filters={TagFilters} otherClasses="sm:min-w-[170px]" />
      </div>

      <DataRenderer
        success={success}
        error={error}
        data={tags}
        empty={EMPTY_TAGS}
        render={(tags) => (
          <div className="flex flex-wrap gap-4 mt-10 w-full">
            {tags.map((tag) => (
              <TagCard key={tag._id} {...tag} compact={false} />
            ))}
          </div>
        )}
      />
      <Pagination page={page} isNext={isNext} />
    </>
  );
};

export default Tags;
