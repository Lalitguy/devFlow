import TagCard from "@/components/cards/TagCard";
import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const hotQuestions = [
  {
    _id: "1",
    title: "How to create and use a custom hook in React ?",
  },
  {
    _id: "2",
    title: "How to use React Query ?",
  },
  {
    _id: "3",
    title: "How to use Redux ?",
  },
  {
    _id: "4",
    title: "How to use React Router ?",
  },
  {
    _id: "5",
    title: "How to use React Context ?",
  },
];

const popularTags = [
  {
    _id: "1",
    name: "react",
    questions: 100,
  },
  {
    _id: "2",
    name: "javascript",
    questions: 200,
  },
  {
    _id: "3",
    name: "css",
    questions: 300,
  },
  {
    _id: "4",
    name: "html",
    questions: 400,
  },
  {
    _id: "5",
    name: "nextjs",
    questions: 500,
  },
];

const RightSideBar = () => {
  return (
    <section className="max-xl:hidden top-0 right-0 sticky flex flex-col gap-6 shadow-light-300 dark:shadow-none p-6 pt-32 light-border border-l w-[350px] h-screen overflow-y-auto custom-scrollbar background-light900_dark200">
      <div>
        <h3 className="text-dark200_light900 h3-bold">Top Questions</h3>

        <div className="flex flex-col gap-[30px] mt-6 w-full">
          {hotQuestions.map(({ _id, title }) => (
            <Link
              href={ROUTES.QUESTION(_id)}
              key={_id}
              className="flex justify-between items-center gap-7 cursor-pointer"
            >
              <p className="text-dark500_light700 body-medium">{title}</p>
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

        <div className="mt-16">
          <h3 className="text-dark200_light800 h3-bold">Popular Tags</h3>
          <div className="flex flex-col gap-4 mt-7">
            {popularTags.map(({ _id, name, questions }) => (
              <TagCard
                key={_id}
                _id={_id}
                name={name}
                questions={questions}
                showCount
                compact
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
