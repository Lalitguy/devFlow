import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";

const questions = [
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

interface searchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
const Home = async ({ searchParams }: searchParams) => {
  const { query = "" } = await searchParams;

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(query?.toLowerCase())
  );

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
      <section>Home Filer</section>

      <div className="flex flex-col gap-6 mt-10 w-full">
        {filteredQuestions.map(({ _id, title }) => (
          <div key={_id}>{title}</div>
        ))}
      </div>
    </>
  );
};

export default Home;
