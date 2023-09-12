import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const logmanageproductApi = createApi({
  reducerPath: "logmanageproductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getListlogmanageproduct: builder.query({
      query: (params) => `logmanageproduct?${serialize(params)}`,
    }),

    getlogmanageproductById: builder.query({
      query: (params) => `logmanageproduct/${params?.id}`,
    }),

    addlogmanageproduct: builder.mutation({
      query: (params) => ({
        url: `logmanageproduct`,
        method: "POST",
        body: params,
      }),
    }),

    updatelogmanageproductById: builder.mutation({
      query: (params) => ({
        url: `logmanageproduct/${params.id}`,
        method: "PUT",
        body: params,
      }),
    }),

    deletelogmanageproductById: builder.mutation({
      query: (params) => ({
        url: `logmanageproduct/${params.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetListlogmanageproductQuery,
  useGetlogmanageproductByIdQuery,
  useAddlogmanageproductMutation,
  useUpdatelogmanageproductByIdMutation,
  useDeletelogmanageproductByIdMutation,
} = logmanageproductApi;
