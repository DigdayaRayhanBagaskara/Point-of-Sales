import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const StrukApi = createApi({
  reducerPath: "strukApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getListstruk: builder.query({
      query: (params) => `struk?${serialize(params)}`,
    }),

    getstrukById: builder.query({
      query: (params) => `struk/${params?.id}`,
    }),

    addstruk: builder.mutation({
      query: (params) => ({
        url: `struk`,
        method: "POST",
        body: params,
      }),
    }),

    updatestrukById: builder.mutation({
      query: (params) => ({
        url: `struk/${params.id}`,
        method: "PUT",
        body: params,
      }),
    }),

    deletestrukById: builder.mutation({
      query: (params) => ({
        url: `struk/${params.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetListstrukQuery,
  useGetstrukByIdQuery,
  useAddstrukMutation,
  useUpdatestrukByIdMutation,
  useDeletestrukByIdMutation,
} = StrukApi;
