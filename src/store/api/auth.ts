import { enhancedApi } from "./index";
import { LoginRequest, LoginResponse } from "types/auth";

export const auth = enhancedApi.injectEndpoints({
  endpoints: (builder) => ({
    loginPost: builder.mutation<LoginResponse, LoginRequest>({
      query(data) {
        return {
          method: "POST",
          url: "/Admin/Login_Super.php",
          data,
        };
      },
    }),
    getMe: builder.query<any, void>({
      query() {
        return {
          method: "GET",
          url: "/admin/v1/auth/me",
        };
      },
    }),
    logout: builder.mutation<any, void>({
      query() {
        return {
          method: "POST",
          url: "/admin/v1/auth/sign-out",
        };
      },
    }),
  }),
});

export const { useLoginPostMutation, useLazyGetMeQuery, useLogoutMutation } =
  auth;
