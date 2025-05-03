import { model, models, Schema, Types } from "mongoose";

export interface IModel {}

const QuestionSchema = new Schema<IModel>({}, { timestamps: true });

const Question = models?.Question || model<IModel>("Question", QuestionSchema);

export default Question;
