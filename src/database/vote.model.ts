import { model, models, Schema, Types, Document } from "mongoose";

export interface IVote {
  author: Types.ObjectId;
  targetId: Types.ObjectId;
  targetType: "question" | "answer";
  voteType: "upvote" | "downvote";
}

const VoteSchema = new Schema<IVote>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    targetId: { type: Schema.Types.ObjectId, required: true },
    targetType: { type: String, enum: ["question", "answer"], required: true },
    voteType: { type: String, enum: ["upvote", "downvote"], required: true },
  },
  { timestamps: true }
);

export type IVoteDoc = IVote & Document;

const Vote = models?.Vote || model<IVote>("Vote", VoteSchema);

export default Vote;
