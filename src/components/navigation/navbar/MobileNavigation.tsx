import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { Button } from "@/components/ui/button";
import NavLinks from "./NavLinks";

const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src={"/icons/hamburger.svg"}
          width={36}
          height={36}
          alt="menu"
          className="sm:hidden invert-colors"
        />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="p-6 border-none background-light900_dark200"
        translate="yes"
      >
        <SheetTitle className="hidden">Are you absolutely sure?</SheetTitle>
        <Link href={"/"} className="flex items-center gap-1">
          <Image
            src={"/images/site-logo.svg"}
            width={23}
            height={23}
            alt="Logo"
          />
          <p className="font-space-grotesk text-dark-100 dark:text-light-900 h2-bold">
            Dev<span className="text-primary-100">Flow</span>
          </p>
        </Link>

        <div className="flex flex-col justify-between h-[calc(100vh-80px)] overflow-y-auto no-scrollbar">
          <SheetClose asChild>
            <section className="flex flex-col gap-6 pt-14 h-full">
              <NavLinks isMobileNav />
            </section>
          </SheetClose>

          <div className="flex flex-col gap-3 mt-6">
            <SheetClose asChild className="">
              <div>
                <Link href={ROUTES.SIGN_IN}>
                  <Button className="shadow-none px-4 py-3 w-full min-h-[41px] small-medium btn-secondary roudned-lg">
                    <span className="primary-text-gradient">Login</span>
                  </Button>
                </Link>
              </div>
            </SheetClose>

            <SheetClose>
              <div>
                <Link href={ROUTES.SIGN_UP}>
                  <Button className="shadow-none px-4 py-3 border light-border-2 rounded-lg w-full min-h-[41px] text-dark400_light900 small-medium btn-tertiary">
                    <span className="primary-text-gradient">Register</span>
                  </Button>
                </Link>
              </div>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
