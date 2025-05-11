"use client";

import { createVote } from "@/lib/actions/vote.action";
import { formatNumber } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { use, useState } from "react";
import { toast } from "sonner";

interface VotesProps {
  upvotes: number;
  downvotes: number;
  targetType: "question" | "answer";
  targetId: string;
  hasVotedPromise: Promise<ActionResponse<HasVotedResponse>>;
}

const Votes = ({
  upvotes,
  downvotes,
  targetType,
  targetId,
  hasVotedPromise,
}: VotesProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { success, data } = use(hasVotedPromise);

  const session = useSession();
  const userId = session?.data?.user?.id;

  if (!success) return null;
  const { hasUpvoted, hasDownvoted } = data!;

  const handleVote = async (voteType: "upvote" | "downvote") => {
    setIsLoading(true);

    if (!userId) {
      toast.error("Please Login to vote", {
        description: "Only logged-in users can vote. ",
      });
    }

    try {
      const result = await createVote({
        targetId,
        targetType,
        voteType,
      });

      if (!result.success) {
        toast.error("Failed to vote", {
          description:
            result.error?.message ||
            "An error occurred while trying to vote. Please try again.",
        });
        return;
      }
      const successMessage =
        voteType === "upvote"
          ? `Upvote ${hasUpvoted ? "remove" : "added"} Successfully`
          : `Downvote ${hasDownvoted ? "remove" : "added"} Successfully`;

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
          src={
            success && hasUpvoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"
          }
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
          src={
            success && hasDownvoted
              ? "/icons/downvoted.svg"
              : "/icons/downvote.svg"
          }
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
