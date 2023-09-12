import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const categoryproductApi = createApi({
  reducerPath: "categoryproductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getListcategory: builder.query({
      query: (params) => `categories?${serialize(params)}`,
      refetchOnMountOrArgChange: true,
    }),
    getcategoryById: builder.query({
      query: (params) => `categories/${params?.id_categories}`,
      refetchOnMountOrArgChange: true,
    }),

    addcategory: builder.mutation({
      query: (params) => ({
        url: `categories`,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["categoryproductApi"],
    }),

    updatecategoryById: builder.mutation({
      query: (params) => ({
        url: `categories/${params.id_categories}`,
        method: "PUT",
        body: params,
      }),
      invalidatesTags: ["categoryproductApi"],
    }),

    deletecategoryById: builder.mutation({
      query: (params) => ({
        url: `categories/${params?.id_categories}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categoryproductApi"],
    }),
  }),
  refetchOnMountOrArgChange: true,
});

export const {
  useGetListcategoryQuery,
  useGetcategoryByIdQuery,
  useAddcategoryMutation,
  useUpdatecategoryByIdMutation,
  useDeletecategoryByIdMutation,
} = categoryproductApi;
