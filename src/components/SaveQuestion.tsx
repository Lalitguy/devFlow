"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { use, useState } from "react";

import { toggleSaveQuestion } from "@/lib/actions/collection.action";
import { toast } from "sonner";

const SaveQuestion = ({ questionId }: { questionId: string }) => {
  const session = useSession();
  const userId = session?.data?.user?.id;

  const hasSaved = false;

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!userId)
      return toast.error("You need to be signed in to use this feature", {
        description:
          "You need to be signed in to use this feature, please sign in to use this feature",
      });

    setIsLoading(true);

    try {
      const { success, data, error } = await toggleSaveQuestion({ questionId });

      if (!success) throw new Error(error?.message || "An error occurred");

      toast("Success", {
        description: `Question ${data?.saved ? "saved" : "unsaved"} successfully`,
      });
    } catch (error) {
      toast.error("An error occurred while saving the question", {
        description:
          error instanceof Error ? error.message : "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Image
      src={hasSaved ? "/icons/star-filled.svg" : "/icons/star-red.svg"}
      width={18}
      height={18}
      alt="save"
      className={`cursor-pointer ${isLoading && "opacity-50"}`}
      aria-label="Save question"
      onClick={isLoading ? undefined : handleSave}
    />
  );
};

export default SaveQuestion;
