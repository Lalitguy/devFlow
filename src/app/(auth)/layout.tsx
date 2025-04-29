import SocialAuthForm from "@/components/forms/SocialAuthForm";
import Image from "next/image";
import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="z-50 flex flex-center justify-center bg-auth-light dark:bg-auth-dark bg-cover bg-no-repeat bg-center w-full min-h-screen">
      <section className="shadow-light100_dark100 shadow-md px-4 sm:px-8 py-10 light-border rounded-[10px] min-w-full sm:min-w-[520px] dark:background-light800_dark200">
        <div className="flex justify-between items-center gap-2">
          <div className="space-y-2.5">
            <h1 className="text-dark100_light900 h2-bold">Join Discord</h1>
            <p className="text-dark500_light400 paragraph-regular">
              {" "}
              To get your questions answered
            </p>
          </div>
          <Image
            src={"images/site-logo.svg"}
            alt="logo"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>
        {children}
        <SocialAuthForm />
      </section>
    </main>
  );
};

export default AuthLayout;
