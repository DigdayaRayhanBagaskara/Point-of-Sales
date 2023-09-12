import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const discountApi = createApi({
  reducerPath: "discountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getListdiscount: builder.query({
      query: (params) => `discount?${serialize(params)}`,
      refetchOnMountOrArgChange: true,
    }),

    getdiscountById: builder.query({
      query: (params) => `discount/${params?.id_discount}`,
      refetchOnMountOrArgChange: true,
    }),

    addiscount: builder.mutation({
      query: (params) => ({
        url: `discount`,
        method: "POST",
        body: params,
      }),
    }),

    updatediscountById: builder.mutation({
      query: (params) => ({
        url: `discount/${params.id_discount}`,
        method: "PUT",
        body: params,
      }),
    }),

    deletediscountById: builder.mutation({
      query: (params) => ({
        url: `discount/${params.id_discount}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetListdiscountQuery,
  useGetdiscountByIdQuery,
  useAddiscountMutation,
  useUpdatediscountByIdMutation,
  useDeletediscountByIdMutation,
} = discountApi;
