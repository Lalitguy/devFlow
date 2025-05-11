import { auth } from "@/auth";
import ProfileLink from "@/components/user/ProfileLink";
import UserAvatar from "@/components/UserAvatar";
import { getUser, getUserQuestions } from "@/lib/actions/user.action";
import { notFound } from "next/navigation";
import React from "react";
import dayjs from "dayjs";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Stats from "@/components/user/Stats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnswerCard from "@/components/cards/AnswerCard";
import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import Pagination from "@/components/Pagination";
import { EMPTY_QUESTION, EMPTY_ANSWERS } from "@/constants/states";
import page from "../page";

const UserProfile = async ({ params, searchParams }: RouteParams) => {
  const { id } = await params;
  const { page, pageSize } = await searchParams;
  if (!id) notFound();

  const loggedInUser = await auth();

  const { success, data, error } = await getUser({
    userId: id,
  });

  if (!success) {
    return (
      <div className="text-dark100_light900 h1-bold">{error?.message}</div>
    );
  }

  const { user, totalAnswers, totalQuestions } = data! || {};

  const { _id, name, image, username, portfolio, location, createdAt, bio } =
    user;

  const {
    success: userQuestionsSuccess,
    data: userQuestionData,
    error: userQuestionsError,
  } = await getUserQuestions({
    userId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
  });

  const { questions, isNext: hasMoreQuestions } = userQuestionData || {};
  return (
    <>
      <section className="flex sm:flex-row flex-col-reverse justify-between items-start">
        <div className="flex lg:flex-row flex-col items-start gap-4">
          <UserAvatar
            id={_id}
            name={name}
            imageUrl={image}
            className="rounded-full size-[140px] object-cover"
          />
          <div className="mt-3">
            <h2 className="text-dark100_light900 h2-bold">{name}</h2>
            <p className="text-dark200_light800 paragraph-regular">
              @{username}
            </p>

            <div className="flex flex-wrap justify-start items-center gap-5 mt-5">
              {portfolio && (
                <ProfileLink
                  imgUrl={"/icons/link.svg"}
                  href={portfolio}
                  title="Portfolio"
                />
              )}

              {location && (
                <ProfileLink imgUrl={"/icons/location.svg"} title="Location" />
              )}

              <ProfileLink
                imgUrl={"/icons/calendar.svg"}
                href={portfolio}
                title={dayjs(createdAt).format("MMMM YYYY")}
              />
            </div>

            <div>
              {bio && (
                <p className="mt-8 text-dark400_light800 paragraph-regular"></p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end sm:mt-3 max-sm:mb-5 max-sm:w-full">
          {loggedInUser?.user?.id === _id && (
            <Link href={ROUTES.EDIT_PROFILE}>
              <Button className="px-4 py-3 min-w-44 min-h-12 text-dark300_light900 paragraph-medium btn-secondary">
                Edit Profile
              </Button>
            </Link>
          )}
        </div>
      </section>

      <Stats
        totalQuestions={totalQuestions}
        totalAnswers={totalAnswers}
        badges={{
          GOLD: 0,
          SILVER: 2,
          BRONZE: 8,
        }}
      />

      <section className="flex gap-10 mt-10">
        <Tabs defaultValue="top-posts" className="flex-[2]">
          <TabsList className="p-1 min-h-[42px] background-light800_dark400">
            <TabsTrigger value="top-posts" className="cursor-pointer tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="cursor-pointer tab">
              Answers
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="top-posts"
            className="flex flex-col gap-6 mt-5 w-full"
          >
            <DataRenderer
              success={userQuestionsSuccess}
              error={userQuestionsError}
              data={questions}
              empty={EMPTY_QUESTION}
              render={(questions) => (
                <div className="flex flex-col gap-6 w-full">
                  {questions.map((question) => (
                    <QuestionCard key={question._id} question={question} />
                  ))}
                </div>
              )}
            />
            <Pagination isNext={hasMoreQuestions} page={page} />
          </TabsContent>

          <TabsContent
            value="answers"
            className="flex flex-col gap-6 mt-5 w-full"
          >
            Answers
          </TabsContent>
        </Tabs>
        <div className="max-lg:hidden flex flex-col flex-1 w-full min-w-[250px]">
          <h3 className="text-dark200_light900 h3-bold">Top Tags</h3>

          <div className="flex flex-col gap-4 mt-7">Tags</div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
