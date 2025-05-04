export {};

declare global {
  interface SignInWithOAuthSchema {
    provider: "github" | "google";
    providerAccountId: string;
    user: {
      name: string;
      username: string;
      image: string;
      email: string;
    };
  }
}
