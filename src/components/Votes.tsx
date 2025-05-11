"use client";

import { formatNumber } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

interface VotesProps {
  upvotes: number;
  downvotes: number;
  hasupVoted: boolean;
  hasdownVoted: boolean;
}
const Votes = ({
  upvotes,
  downvotes,
  hasupVoted,
  hasdownVoted,
}: VotesProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();

  const userId = session?.data?.user?.id;

  const handleVote = async (voteType: "upvote" | "downvote") => {
    setIsLoading(true);

    if (!userId) {
      toast.error("Please Login to vote", {
        description: "Only logged-in users can vote. ",
      });
    }

    try {
      const successMessage =
        voteType === "upvote"
          ? `Upvote ${hasupVoted ? "remove" : "added"} Successfully`
          : `Downvote ${hasdownVoted ? "remove" : "added"} Successfully`;

      toast.success(successMessage, {
        description: "Your vote has been recorded",
      });
    } catch {
      toast.error("Failed to vote", {
        description:
          "An error occurred while trying to vote. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-center gap-2.5">
      <div className="flex-center gap-1.5">
        <Image
          src={hasupVoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"}
          width={18}
          height={18}
          alt="upvote"
          aria-label="upvote"
          onClick={() => !isLoading && handleVote("upvote")}
        />
        <div className="flex-center p-1 rounded-sm min-w-5 background-light700_dark400">
          <p className="text-dark400_light900 subtle-medium">
            {formatNumber(upvotes)}
          </p>
        </div>
      </div>

      <div className="flex-center gap-1.5">
        <Image
          src={hasdownVoted ? "/icons/downvoted.svg" : "/icons/downvote.svg"}
          width={18}
          height={18}
          alt="upvote"
          aria-label="upvote"
          onClick={() => !isLoading && handleVote("downvote")}
        />
        <div className="flex-center p-1 rounded-sm min-w-5 background-light700_dark400">
          <p className="text-dark400_light900 subtle-medium">
            {formatNumber(downvotes)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Votes;
