import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getListproduct: builder.query({
      query: (params) => `produk?${serialize(params)}`,
      refetchOnMountOrArgChange: true,
    }),

    getproductById: builder.query({
      query: (params) => `produk/${params?.id_produk}`,
      refetchOnMountOrArgChange: true,
    }),

    addproduct: builder.mutation({
      query: (params) => ({
        url: `produk`,
        method: "POST",
        body: params,
      }),
    }),

    updateproductById: builder.mutation({
      query: (params) => ({
        url: `produk/${params.id_produk}`,
        method: "PUT",
        body: params,
      }),
    }),

    deleteproductById: builder.mutation({
      query: (params) => ({
        url: `produk/${params.id_produk}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetListproductQuery,
  useGetproductByIdQuery,
  useAddproductMutation,
  useUpdateproductByIdMutation,
  useDeleteproductByIdMutation,
} = productApi;
