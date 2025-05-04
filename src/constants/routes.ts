const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  PROFILE: (id: string) => `/profile/${id}`,
  QUESTION: (id: string) => `/question/${id}`,
  TAGS: (id: string) => `/tag/${id}`,
  ASK_QUESTION: "/ask-question",
  SIGNIN_WITH_OAUTH: "/sign-in-with-oauth",
};

export default ROUTES;
