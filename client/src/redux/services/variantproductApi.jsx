import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const variantproductApi = createApi({
  reducerPath: "variantproductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getListvariant: builder.query({
      query: (params) => `variant?${serialize(params)}`,
      refetchOnMountOrArgChange: true,
    }),

    getvariantById: builder.query({
      query: (params) => `variant/${params?.id_produk_variant}`,
      refetchOnMountOrArgChange: true,
    }),

    addvariant: builder.mutation({
      query: (params) => ({
        url: `variant`,
        method: "POST",
        body: params,
      }),
    }),

    updatevariantById: builder.mutation({
      query: (params) => ({
        url: `variant/${params.id_produk_variant}`,
        method: "PUT",
        body: params,
      }),
    }),

    deletevariantById: builder.mutation({
      query: (params) => ({
        url: `variant/${params.id_produk_variant}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetListvariantQuery,
  useAddvariantMutation,
  useDeletevariantByIdMutation,
  useUpdatevariantByIdMutation,
  useGetvariantByIdQuery,
} = variantproductApi;
