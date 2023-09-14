import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    authAdmin: builder.mutation({
      query: (params) => ({
        url: `/auth/login`,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["authApi"],
    }),
    logoutAdmin: builder.mutation({
      query: (params) => ({
        url: `/auth/logout`,
        method: "POST",
      }),
      invalidatesTags: ["authApi"],
    }),
  }),
  refetchOnMountOrArgChange: true,
});

export const { useAuthAdminMutation, useLogoutAdminMutation } = authApi;
