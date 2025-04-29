import NavBar from "@/components/ui/navigation/navbar";
import React, { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
};

export default RootLayout;
