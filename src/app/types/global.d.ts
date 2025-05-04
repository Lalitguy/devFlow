import { NextResponse } from "next/server";

declare global {
  interface Tag {
    _id: string;
    name: string;
  }

  interface Author {
    _id: string;
    name: string;
    image: string;
  }

  interface QuestionProps {
    _id: string;
    title: string;
    tags: Tag[];
    createdAt: Date;
    author: Author;
    upvotes: number;
    answers: number;
    views: number;
  }

  type ActionResponse<T = null> = {
    success: boolean;
    status?: number;
    data?: T;
    error?: {
      message: string;
      details?: Record<string, string[]>;
    };
  };

  type SuccessResponse<T = null> = ActionResponse<T> & {
    success: true;
  };

  type ErrorResponse = ActionResponse<undefinded> & {
    success: false;
  };

  type ApiErrorResponse = NextResponse<ErrorResponse>;
}
