import { NextResponse } from "next/server";
export {};

declare global {
  interface Tag {
    _id: string;
    name: string;
    questions: number;
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

  interface RouteParams {
    params: Promise<Record<string, string>>;
    searchParams: Promise<Record<string, string>>;
  }

  interface QuestionI {
    _id: string;
    title: string;
    content: string;
    tags: Tag[];
    author: Author;
    createdAt: Date;
    upvotes: number;
    downvotes: number;
    answers: number;
    views: number;
  }

  interface Answer {
    _id: string;
    author: Author;
    content: string;
    createdAt: Date;
    upvotes: number;
    downvotes: number;
  }

  interface PaginatedSearchParams {
    page?: number;
    pageSize?: number;
    query?: string;
    filter?: string;
    sort?: string;
  }

  interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    bio?: string;
    image?: string;
    location?: string;
    portfolio?: string;
    reputation?: number;
    createdAt: Date;
  }

  interface Collection {
    _id: string;
    author: string | Author;
    question: QuestionI;
  }

  interface BadgeCounts {
    GOLD: number;
    SILVER: number;
    BRONZE: number;
  }

  type ErrorType = {
    message: string;
    details?: Record<string, string[]>;
  };

  type ActionResponse<T = null> = {
    success: boolean;
    status?: number;
    data?: T;
    error?: ErrorType;
  };

  type SuccessResponse<T = null> = ActionResponse<T> & {
    success: true;
  };

  type ErrorResponse = ActionResponse<undefinded> & {
    success: false;
  };

  type ApiErrorResponse = NextResponse<ErrorResponse>;
  type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;
}
