import NavBar from "@/components/navigation/navbar";
import LeftSideBar from "@/components/navigation/sidebar/LeftSideBar";
import RightSideBar from "@/components/navigation/sidebar/RightSideBar";
import React, { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NavBar />
      <main className="relative flex w-full background-light850_dark100">
        <LeftSideBar />

        <section className="flex flex-col px-6 sm:px-14 pt-36 pb-6 max-md:pb-14 min-h-screen">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>

        <RightSideBar />
      </main>
    </>
  );
};

export default RootLayout;
