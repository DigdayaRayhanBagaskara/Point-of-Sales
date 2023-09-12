import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const rolesApi = createApi({
  reducerPath: "rolesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getListroles: builder.query({
      query: (params) => `roles?${serialize(params)}`,
      providesTags: ["rolesApi"],
    }),

    getrolesById: builder.query({
      query: (params) => `roles/${params?.id}`,
      providesTags: ["rolesApi"],
    }),

    addroles: builder.mutation({
      query: (params) => ({
        url: `roles`,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["rolesApi"],
    }),

    updaterolesById: builder.mutation({
      query: (params) => ({
        url: `roles/${params.id}`,
        method: "PUT",
        body: params,
      }),
      invalidatesTags: ["rolesApi"],
    }),

    deleterolesById: builder.mutation({
      query: (params) => ({
        url: `roles/${params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["rolesApi"],
    }),
  }),
});

export const {
  useGetListrolesQuery,
  useGetrolesByIdQuery,
  useAddrolesMutation,
  useUpdaterolesByIdMutation,
  useDeleterolesByIdMutation,
} = rolesApi;
