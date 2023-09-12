import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const salesreportApi = createApi({
  reducerPath: "salesreportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getListsalesreport: builder.query({
      query: (params) => `salesreport?${serialize(params)}`,
    }),

    getsalesreportById: builder.query({
      query: (params) => `salesreport/${params?.id}`,
    }),

    addsalesreport: builder.mutation({
      query: (params) => ({
        url: `salesreport`,
        method: "POST",
        body: params,
      }),
    }),

    updatesalesreportById: builder.mutation({
      query: (params) => ({
        url: `salesreport/${params.id}`,
        method: "PUT",
        body: params,
      }),
    }),

    deletesalesreportById: builder.mutation({
      query: (params) => ({
        url: `salesreport/${params.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetListsalesreportQuery,
  useGetsalesreportByIdQuery,
  useAddsalesreportMutation,
  useUpdatesalesreportByIdMutation,
  useDeletesalesreportByIdMutation,
} = salesreportApi;
