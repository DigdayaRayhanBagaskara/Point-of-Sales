import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getListusers: builder.query({
      query: (params) => ({
        url: `users?${serialize(params)}`,
      }),
      providesTags: ["usersApi"],
    }),

    getusersById: builder.query({
      query: (params) => `users/${params?.id}`,
      providesTags: ["usersApi"],
    }),

    addusers: builder.mutation({
      query: (params) => ({
        url: `users`,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["usersApi"],
    }),

    updateusersById: builder.mutation({
      query: (params) => ({
        url: `users/${params.id}`,
        method: "PUT",
        body: params,
      }),
      invalidatesTags: ["usersApi"],
    }),

    deleteusersById: builder.mutation({
      query: (params) => ({
        url: `users/${params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["usersApi"],
    }),
  }),
  refetchOnMountOrArgChange: true,
});

export const {
  useGetListusersQuery,
  useGetusersByIdQuery,
  useAddusersMutation,
  useUpdateusersByIdMutation,
  useDeleteusersByIdMutation,
} = usersApi;
