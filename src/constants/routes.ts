const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  COMMUNITY: "/community",
  TAGS: "/tags",
  JOBS: "/jobs",
  COLLECTION: "/collection",
  PROFILE: (id: string) => `/profile/${id}`,
  EDIT_PROFILE: `/profile/edit`,
  QUESTION: (id: string) => `/questions/${id}`,
  TAG: (id: string) => `/tags/${id}`,
  ASK_QUESTION: "/ask-question",
  SIGNIN_WITH_OAUTH: "/sign-in-with-oauth",
};

export default ROUTES;
