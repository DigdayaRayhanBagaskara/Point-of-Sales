import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const salestransactionApi = createApi({
  reducerPath: "salestransactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getListsalestransaction: builder.query({
      query: (params) => `salestransaction?${serialize(params)}`,
    }),

    getsalestransactionById: builder.query({
      query: (params) => `salestransaction/${params?.id}`,
    }),

    addsalestransaction: builder.mutation({
      query: (params) => ({
        url: `salestransaction`,
        method: "POST",
        body: params,
      }),
    }),

    updatesalestransactionById: builder.mutation({
      query: (params) => ({
        url: `salestransaction/${params.id}`,
        method: "PUT",
        body: params,
      }),
    }),

    deletesalestransactionById: builder.mutation({
      query: (params) => ({
        url: `salestransaction/${params.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetListsalestransactionQuery,
  useGetsalestransactionByIdQuery,
  useAddsalestransactionMutation,
  useUpdatesalestransactionByIdMutation,
  useDeletesalestransactionByIdMutation,
} = salestransactionApi;
