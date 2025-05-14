import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";
import MobileNavigation from "./MobileNavigation";
import UserAvatar from "@/components/UserAvatar";
import { auth } from "@/auth";

const NavBar = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="z-50 fixed flex-between items-center shadow-light-500 dark:shadow-none p-6 sm:px-12 w-full background-light900_dark200">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/images/site-logo.svg" alt="logo" width={24} height={24} />
        <p className="max-sm:hidden font-space-grotesk text-dark-100 dark:text-light-900 h2-bold">
          Dev<span className="text-primary-500">Flow</span>
        </p>
      </Link>

      <p>Global Search</p>
      <div className="flex gap-4">
        <Theme />
        {user?.id && user?.name && (
          <UserAvatar id={user.id} name={user.name} imageUrl={user.image} />
        )}
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default NavBar;
