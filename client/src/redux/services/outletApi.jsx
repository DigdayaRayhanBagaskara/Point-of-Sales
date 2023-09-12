import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const outletApi = createApi({
  reducerPath: "outletApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getListoutlet: builder.query({
      query: (params) => `outlet?${serialize(params)}`,
      refetchOnMountOrArgChange: true,
    }),

    getoutletById: builder.query({
      query: (params) => `outlet/${params?.id_outlet}`,
      refetchOnMountOrArgChange: true,
    }),

    addoutlet: builder.mutation({
      query: (params) => ({
        url: `outlet`,
        method: "POST",
        body: params,
      }),
    }),

    updateoutletById: builder.mutation({
      query: (params) => ({
        url: `outlet/${params.id_outlet}`,
        method: "PUT",
        body: params,
      }),
    }),

    deleteoutletById: builder.mutation({
      query: (params) => ({
        url: `outlet/${params.id_outlet}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetListoutletQuery,
  useGetoutletByIdQuery,
  useAddoutletMutation,
  useUpdateoutletByIdMutation,
  useDeleteoutletByIdMutation,
} = outletApi;
