import React from "react";
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filter/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import { QuestionProps } from "../types/global";

const questions: QuestionProps[] = [
  {
    _id: "1",
    title: "How to create and use a custom hook in React ?",
    tags: [{ _id: "1", name: "React" }],
    createdAt: new Date(),
    author: { _id: "1", name: "John Doe", image: "/icons/avatar.svg" },
    upvotes: 10,
    answers: 5,
    views: 100,
  },
  {
    _id: "2",
    title: "How to use useEffect hook in React ?",
    tags: [{ _id: "1", name: "React" }],
    createdAt: new Date("2023-10-01"),
    author: { _id: "1", name: "John Doe", image: "/icons/avatar.svg" },
    upvotes: 10,
    answers: 5,
    views: 100,
  },
  {
    _id: "3",
    title: "How to use Javascript ?",
    tags: [{ _id: "1", name: "javascript" }],
    createdAt: new Date("2023-10-01"),
    author: { _id: "1", name: "John Doe", image: "/icons/avatar.svg" },
    upvotes: 10,
    answers: 5,
    views: 100,
  },
  {
    _id: "4",
    title: "What is Query ?",
    tags: [{ _id: "1", name: "bun" }],
    createdAt: new Date("2023-10-01"),
    author: { _id: "1", name: "John Doe", image: "/icons/avatar.svg" },
    upvotes: 10,
    answers: 5,
    views: 100,
  },
];

interface searchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
const Home = async ({ searchParams }: searchParams) => {
  const { query = "", filter = "" } = await searchParams;

  const filteredQuestions = questions.filter((question) => {
    const queryMatch = question.title
      .toLowerCase()
      .includes(query?.toLowerCase());

    const filterMatch = filter
      ? question.tags.some(
          (tag) => tag.name.toLowerCase() === filter?.toLowerCase()
        )
      : true;

    return queryMatch && filterMatch;
  });

  return (
    <>
      <section className="flex sm:flex-row flex-col-reverse justify-between sm:items-center gap-4 w-full">
        <h1 className="text-dark100_light900 h1-bold">All Questions</h1>
        <Button
          className="px-4 py-3 min-h-[46px] !text-light-900 primary-gradient"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      {/* Todo */}
      <section className="mt-11">
        <LocalSearch route="/" placeholder="Search questions..." />
      </section>

      <HomeFilter />

      <div className="flex flex-col gap-6 mt-10 w-full">
        {filteredQuestions.map((e) => (
          <QuestionCard question={e} key={e._id} />
        ))}
      </div>
    </>
  );
};

export default Home;
