import TagCard from "@/components/cards/TagCard";
import DataRenderer from "@/components/DataRenderer";
import ROUTES from "@/constants/routes";
import { getHotQuestions } from "@/lib/actions/question.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RightSideBar = async () => {
  const { success, data: hotQuestions, error } = await getHotQuestions();

  return (
    <section className="max-xl:hidden top-0 right-0 sticky flex flex-col gap-6 shadow-light-300 dark:shadow-none p-6 pt-32 light-border border-l w-[350px] h-screen overflow-y-auto custom-scrollbar background-light900_dark200">
      <div>
        <h3 className="text-dark200_light900 h3-bold">Top Questions</h3>

        <DataRenderer
          success={success}
          error={error}
          data={hotQuestions}
          empty={{
            title: "No hot questions found",
            message:
              "Feel free to ask your questions and they will be displayed here.",
          }}
          render={(hotQuestions) => (
            <div className="flex flex-col gap-[30px] mt-7 w-full">
              {hotQuestions.map(({ _id, title }, index) => (
                <Link
                  href={ROUTES.QUESTION(_id)}
                  key={_id}
                  className="flex justify-between items-center gap-5 cursor-pointer"
                >
                  <Image
                    src={
                      index % 2 === 0
                        ? "/icons/hot-even.svg"
                        : "/icons/hot-odd.svg"
                    }
                    alt="Hot Question"
                    width={20}
                    height={20}
                    className="self-start mt-1"
                  />
                  <p className="text-dark500_light700 hover:underline line-clamp-2 transition-all body-medium">
                    {title}
                  </p>
                  <Image
                    src={"/icons/chevron-right.svg"}
                    alt="Chevron"
                    width={20}
                    height={20}
                    className="invert-colors"
                  />
                </Link>
              ))}
            </div>
          )}
        />

        <div className="mt-16">
          <h3 className="text-dark200_light800 h3-bold">Popular Tags</h3>
          <div className="flex flex-col gap-4 mt-7">
            {/* {popularTags.map(({ _id, name, questions }) => (
              <TagCard
                key={_id}
                _id={_id}
                name={name}
                questions={questions}
                showCount
                compact
              />
            ))} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
