import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const promosiApi = createApi({
  reducerPath: "promosiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getListpromosi: builder.query({
      query: (params) => `promosi?${serialize(params)}`,
    }),

    getpromosiById: builder.query({
      query: (params) => `promosi/${params?.id}`,
    }),

    addpromosi: builder.mutation({
      query: (params) => ({
        url: `promosi`,
        method: "POST",
        body: params,
      }),
    }),

    updatepromosiById: builder.mutation({
      query: (params) => ({
        url: `promosi/${params.id}`,
        method: "PUT",
        body: params,
      }),
    }),

    deletepromosiById: builder.mutation({
      query: (params) => ({
        url: `promosi/${params.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetListpromosiQuery,
  useGetpromosiByIdQuery,
  useAddpromosiMutation,
  useUpdatepromosiByIdMutation,
  useDeletepromosiByIdMutation,
} = promosiApi;
