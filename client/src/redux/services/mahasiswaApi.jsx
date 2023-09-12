import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const mahasiswaApi = createApi({
  reducerPath: "mahasiswaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  endpoints: (builder) => ({
    getListMahasiswa: builder.query({
      query: (params) => `mahasiswa?${serialize(params)}`,
    }),

    getMahasiswaById: builder.query({
      query: (params) => `mahasiswa/${params?.id}`,
    }),

    addMahasiswa: builder.mutation({
      query: (params) => ({
        url: `mahasiswa`,
        method: "POST",
        body: params,
      }),
    }),

    updateMahasiswaById: builder.mutation({
      query: (params) => ({
        url: `mahasiswa/${params.id}`,
        method: "PUT",
        body: params,
      }),
    }),

    deleteMahasiswaById: builder.mutation({
      query: (params) => ({
        url: `mahasiswa/${params.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetListMahasiswaQuery,
  useGetMahasiswaByIdQuery,
  useAddMahasiswaMutation,
  useUpdateMahasiswaByIdMutation,
  useDeleteMahasiswaByIdMutation,
} = mahasiswaApi;
