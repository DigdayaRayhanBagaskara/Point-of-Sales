import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const varianproductApi = createApi({
  reducerPath: "varianproductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getListvarianproduct: builder.query({
      query: (params) => `varianproduct?${serialize(params)}`,
    }),

    getvarianproductById: builder.query({
      query: (params) => `varianproduct/${params?.id}`,
    }),

    addvarianproduct: builder.mutation({
      query: (params) => ({
        url: `varianproduct`,
        method: "POST",
        body: params,
      }),
    }),

    updatevarianproductById: builder.mutation({
      query: (params) => ({
        url: `varianproduct/${params.id}`,
        method: "PUT",
        body: params,
      }),
    }),

    deletevarianproductById: builder.mutation({
      query: (params) => ({
        url: `varianproduct/${params.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetListvarianproductQuery,
  useGetvarianproductByIdQuery,
  useAddvarianproductMutation,
  useUpdatevarianproductByIdMutation,
  useDeletevarianproductByIdMutation,
} = varianproductApi;
