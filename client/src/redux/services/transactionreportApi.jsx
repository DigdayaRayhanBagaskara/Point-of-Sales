import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const TransactionreportApi = createApi({
  reducerPath: "transactionreportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getListtransactionreport: builder.query({
      query: (params) => `transactionreport?${serialize(params)}`,
    }),

    gettransactionreportById: builder.query({
      query: (params) => `transactionreport/${params?.id}`,
    }),

    addtransactionreport: builder.mutation({
      query: (params) => ({
        url: `transactionreport`,
        method: "POST",
        body: params,
      }),
    }),

    updatetransactionreportById: builder.mutation({
      query: (params) => ({
        url: `transactionreport/${params.id}`,
        method: "PUT",
        body: params,
      }),
    }),

    deletetransactionreportById: builder.mutation({
      query: (params) => ({
        url: `transactionreport/${params.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetListtransactionreportQuery,
  useGettransactionreportByIdQuery,
  useAddtransactionreportMutation,
  useUpdatetransactionreportByIdMutation,
  useDeletetransactionreportByIdMutation,
} = TransactionreportApi;
