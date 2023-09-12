import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const promoApi = createApi({
  reducerPath: "promoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getListpromo: builder.query({
      query: (params) => `promo?${serialize(params)}`,
      refetchOnMountOrArgChange: true,
    }),

    getpromoById: builder.query({
      query: (params) => `promo/${params?.id_promo}`,
      refetchOnMountOrArgChange: true,
    }),

    addpromo: builder.mutation({
      query: (params) => ({
        url: `promo`,
        method: "POST",
        body: params,
      }),
    }),

    updatepromoById: builder.mutation({
      query: (params) => ({
        url: `promo/${params.id_promo}`,
        method: "PUT",
        body: params,
      }),
    }),

    deletepromoById: builder.mutation({
      query: (params) => ({
        url: `promo/${params.id_promo}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetListpromoQuery,
  useGetpromoByIdQuery,
  useAddpromoMutation,
  useUpdatepromoByIdMutation,
  useDeletepromoByIdMutation,
} = promoApi;
