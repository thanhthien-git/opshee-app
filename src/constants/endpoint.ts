export const endpoint = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  auth: {
    login: "/auth/login",
    register: "/auth/sign-up",
  },

  user: {
    me: "/user/me",
  },
};
