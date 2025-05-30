import SocialAuthForm from "@/components/forms/SocialAuthForm";
import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex flex-center justify-center bg-auth-light dark:bg-auth-dark bg-cover bg-no-repeat bg-center w-full min-h-screen">
      <section className="shadow-light100_dark100 shadow-md px-4 sm:px-8 py-10 border light-border rounded-[10px] min-w-full sm:min-w-[520px] background-light800_dark200">
        <Link
          href={ROUTES.HOME}
          className="top-10 left-10 absolute flex items-center gap-3 p-3 rounded-2 home_transparent_btn"
        >
          <Image
            src={"/icons/home.svg"}
            height={24}
            width={24}
            alt="home"
            className="invert-colors"
          />
          <span>Home</span>
        </Link>

        <div className="flex justify-between items-center gap-2">
          <div className="space-y-2.5">
            <h1 className="text-dark100_light900 h2-bold">Join DevFlow</h1>
            <p className="text-dark500_light400 paragraph-regular">
              To get your questions answered
            </p>
          </div>
          <Link href={ROUTES.HOME}>
            <Image
              src={"images/site-logo.svg"}
              alt="logo"
              width={50}
              height={50}
              className="object-contain"
            />
          </Link>
        </div>
        {children}
        <SocialAuthForm />
      </section>
    </main>
  );
};

export default AuthLayout;
