"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import ROUTES from "@/constants/routes";

const SocialAuthForm = () => {
  const handleSocialLogin = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        redirectTo: ROUTES.HOME,
      });
    } catch (err) {
      toast.error("Sign in Failed", {
        description:
          err instanceof Error
            ? err.message
            : "An error occured during Sign in",
        richColors: true,
        position: "top-center",
      });
    }
  };
  return (
    <div className="flex flex-wrap gap-2.5 mt-8">
      <Button
        className="flex-1 px-4 py-3.5 rounded-2 min-h-12 text-dark200_light800 background-dark400_light900 body-medium"
        onClick={() => handleSocialLogin("github")}
      >
        <Image
          src={"/icons/github.svg"}
          alt="Github Logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Log in with Github</span>
      </Button>

      <Button
        className="flex-1 px-4 py-3.5 rounded-2 min-h-12 text-dark200_light800 background-dark400_light900 body-medium"
        onClick={() => handleSocialLogin("google")}
      >
        <Image
          src={"/icons/google.svg"}
          alt="Google Logo"
          width={20}
          height={20}
          className="mr-2.5 object-contain"
        />
        <span>Log in with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
