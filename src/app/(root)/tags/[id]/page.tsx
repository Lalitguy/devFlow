import React from "react";
import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/routes";
import { EMPTY_QUESTION } from "@/constants/states";
import { getTagQuestions } from "@/lib/actions/tag.action";
import { getDeviconClassName, cn } from "@/lib/utils";
import Pagination from "@/components/Pagination";

const page = async ({ params, searchParams }: RouteParams) => {
  const { id } = await params;
  const { page, pageSize, query } = await searchParams;
  const { success, error, data } = await getTagQuestions({
    tagId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
  });

  const { tag, questions, isNext } = data || {};
  const iconClass = getDeviconClassName(tag?.name || "unknown");

  return (
    <>
      <section className="flex sm:flex-row flex-col-reverse justify-between sm:items-center gap-4 w-full">
        <h1 className="text-dark100_light900 h1-bold">
          {tag?.name}{" "}
          <i className={cn(iconClass, "text-2xl ml-3")} aria-hidden="true" />
        </h1>
      </section>
      {/* Todo */}
      <section className="mt-11">
        <LocalSearch
          route={ROUTES.TAG(id)}
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
      </section>

      <DataRenderer
        success={success}
        error={error}
        data={questions}
        empty={EMPTY_QUESTION}
        render={(questions) => (
          <div className="flex flex-col gap-6 mt-10 w-full">
            {questions?.map((question) => (
              <QuestionCard question={question} key={question._id} />
            ))}
          </div>
        )}
      />
      <Pagination page={page} isNext={isNext} />
    </>
  );
};

export default page;
