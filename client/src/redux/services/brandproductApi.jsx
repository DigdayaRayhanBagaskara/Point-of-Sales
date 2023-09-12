import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const brandproductApi = createApi({
  reducerPath: "brandproductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getListbrand: builder.query({
      query: (params) => `brand-produk?${serialize(params)}`,
      refetchOnMountOrArgChange: true,
    }),

    getbrandById: builder.query({
      query: (params) => `brand-produk/${params?.id_brands_produk}`,
      refetchOnMountOrArgChange: true,
    }),

    addbrand: builder.mutation({
      query: (params) => ({
        url: `brand-produk`,
        method: "POST",
        body: params,
      }),
    }),

    updatebrandById: builder.mutation({
      query: (params) => ({
        url: `brand-produk/${params.id_brands_produk}`,
        method: "PUT",
        body: params,
      }),
    }),

    deletebrandById: builder.mutation({
      query: (params) => ({
        url: `brand-produk/${params.id_brands_produk}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetListbrandQuery,
  useGetbrandByIdQuery,
  useAddbrandMutation,
  useUpdatebrandByIdMutation,
  useDeletebrandByIdMutation,
} = brandproductApi;
