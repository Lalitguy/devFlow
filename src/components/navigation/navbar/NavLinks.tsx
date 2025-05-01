"use client";
import React from "react";
import { sideBarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";

interface NavLinksProps {
  isMobileNav?: boolean;
}
const NavLinks = ({ isMobileNav = true }: NavLinksProps) => {
  const pathname = usePathname();
  const userId = 1; //Todo

  return (
    <>
      {sideBarLinks.map((item) => {
        const isActive =
          pathname === item.route ||
          (pathname.includes(item.route) && item.route.length > 1);

        const link =
          item.route === "/profile"
            ? userId
              ? `${item.route}${userId}`
              : item.route
            : item.route;

        const LinkComponent = (
          <Link
            href={link}
            key={item.route}
            className={cn(
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : " text-dark300_light900",
              "flex items-center justify-start gap-4 bg-transparent px-4 py-3"
            )}
          >
            <Image
              src={item.imgURL}
              width={20}
              height={20}
              alt={"icon"}
              className={cn({
                "invert-colors": !isActive,
              })}
            />
            <p
              className={cn(
                isActive ? "base-bold" : " base-medium",
                !isMobileNav && "max-lg:hidden"
              )}
            >
              {item.label}
            </p>
          </Link>
        );

        return isMobileNav ? (
          <SheetClose asChild key={item.route}>
            {LinkComponent}
          </SheetClose>
        ) : (
          LinkComponent
        );
      })}
    </>
  );
};

export default NavLinks;
