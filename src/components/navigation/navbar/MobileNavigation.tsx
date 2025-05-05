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
import { auth, signOut } from "@/auth";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

const MobileNavigation = async () => {
  const session = await auth();

  const userId = session?.user?.id;

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

        <div className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto no-scrollbar">
          <section className="flex flex-col gap-6 pt-14">
            <NavLinks isMobileNav />
          </section>

          <section className="flex flex-col gap-3 mt-6">
            {userId ? (
              <SheetClose asChild>
                <form
                  action={async () => {
                    "use server";

                    await signOut();
                    redirect(ROUTES.SIGN_IN);
                  }}
                >
                  <Button
                    type="submit"
                    className="!bg-transparent px-4 py-3 w-fit base-medium"
                  >
                    <LogOut className="size-5 text-black dark:text-white" />
                    <span className="text-dark300_light900 n">Logout</span>
                  </Button>
                </form>
              </SheetClose>
            ) : (
              <>
                <SheetClose asChild>
                  <Link href={ROUTES.SIGN_IN}>
                    <Button className="shadow-none px-4 py-3 w-full min-h-[41px] small-medium btn-secondary roudned-lg">
                      <span className="primary-text-gradient">Login</span>
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href={ROUTES.SIGN_UP}>
                    <Button className="shadow-none px-4 py-3 border light-border-2 rounded-lg w-full min-h-[41px] text-dark400_light900 small-medium btn-tertiary">
                      <span className="primary-text-gradient">Register</span>
                    </Button>
                  </Link>
                </SheetClose>
              </>
            )}
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
