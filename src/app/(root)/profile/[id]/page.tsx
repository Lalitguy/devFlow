import { auth } from "@/auth";
import ProfileLink from "@/components/user/ProfileLink";
import UserAvatar from "@/components/UserAvatar";
import { getUser } from "@/lib/actions/user.action";
import { notFound } from "next/navigation";
import React from "react";
import dayjs from "dayjs";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const UserProfile = async ({ params }: RouteParams) => {
  const { id } = await params;
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
  return (
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
          <p className="text-dark200_light800 paragraph-regular">@{username}</p>

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
  );
};

export default UserProfile;
