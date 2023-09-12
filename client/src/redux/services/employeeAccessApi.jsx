import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const employeeAccessApi = createApi({
  reducerPath: "employeeAccessApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getListemployeeAccess: builder.query({
      query: (params) => `employee-access?${serialize(params)}`,
      providesTags: ["employeeAccessApi"],
    }),

    getemployeeByIdAccess: builder.query({
      query: (params) => `employee-access/${params?.id}`,
      providesTags: ["employeeAccessApi"],
    }),

    addemployeeAccess: builder.mutation({
      query: (params) => ({
        url: `employee-access`,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["employeeAccessApi"],
    }),

    updateemployeeByIdAccess: builder.mutation({
      query: (params) => ({
        url: `employee-access/${params.id}`,
        method: "PUT",
        body: params,
      }),
      invalidatesTags: ["employeeAccessApi"],
    }),

    deleteemployeeByIdAccess: builder.mutation({
      query: (params) => ({
        url: `employee-access/${params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["employeeAccessApi"],
    }),
  }),
});

export const {
  useGetListemployeeAccessQuery,
  useGetemployeeByIdAccessQuery,
  useAddemployeeAccessMutation,
  useUpdateemployeeByIdAccessMutation,
  useDeleteemployeeByIdAccessMutation,
} = employeeAccessApi;
