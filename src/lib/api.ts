import { IUser } from "@/database/user.model";
import { fetchHandler } from "./handlers/fetch";
import { IAccount } from "@/database/account.model";
import ROUTES from "@/constants/routes";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const api = {
  users: {
    getAll: () => fetchHandler(`${BASE_URL}/users`),
    getById: (id: string) => fetchHandler(`${BASE_URL}/users/${id}`),
    getByEmail: (email: string) =>
      fetchHandler(`${BASE_URL}/users/email`, {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
    create: (userData: Partial<IUser>) =>
      fetchHandler(`${BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(userData),
      }),
    update: (userData: Partial<IUser>) =>
      fetchHandler(`${BASE_URL}/users`, {
        method: "PUT",
        body: JSON.stringify(userData),
      }),
    delete: (id: string) =>
      fetchHandler(`${BASE_URL}/users/${id}`, {
        method: "DELETE",
      }),
  },
  accounts: {
    getAll: () => fetchHandler(`${BASE_URL}/accounts`),
    getById: (id: string) => fetchHandler(`${BASE_URL}/accounts/${id}`),
    getByProvider: (providerAccountId: string) =>
      fetchHandler(`${BASE_URL}/accounts/provider`, {
        method: "POST",
        body: JSON.stringify({ providerAccountId }),
      }),
    create: (accountData: Partial<IAccount>) =>
      fetchHandler(`${BASE_URL}/accounts`, {
        method: "POST",
        body: JSON.stringify(accountData),
      }),
    update: (accountData: Partial<IAccount>) =>
      fetchHandler(`${BASE_URL}/accounts`, {
        method: "PUT",
        body: JSON.stringify(accountData),
      }),
    delete: (id: string) =>
      fetchHandler(`${BASE_URL}/accounts/${id}`, {
        method: "DELETE",
      }),
  },
  auth: {
    oAuthSignIn: ({
      user,
      provider,
      providerAccountId,
    }: SignInWithOAuthParams) =>
      fetchHandler(`${BASE_URL}/auth${ROUTES.SIGNIN_WITH_OAUTH}`, {
        method: "POST",
        body: JSON.stringify({ user, provider, providerAccountId }),
      }),
  },
  ai: {
    getAnswer: (question: string, content: string, userAnswer?: string) =>
      fetchHandler<string>(`${BASE_URL}/ai/answers`, {
        method: "POST",
        body: JSON.stringify({ question, content, userAnswer }),
        timeout: 15000,
      }),
  },
};
