import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getListemployee: builder.query({
      query: (params) => `employee?${serialize(params)}`,
      providesTags: ["employeeApi"],
    }),

    getemployeeById: builder.query({
      query: (params) => `employee/${params?.id}`,
      providesTags: ["employeeApi"],
    }),

    addemployee: builder.mutation({
      query: (params) => ({
        url: `employee`,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["employeeApi"],
    }),

    updateemployeeById: builder.mutation({
      query: (params) => ({
        url: `employee/${params.id}`,
        method: "PUT",
        body: params,
      }),
      invalidatesTags: ["employeeApi"],
    }),

    deleteemployeeById: builder.mutation({
      query: (params) => ({
        url: `employee/${params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["employeeApi"],
    }),
  }),
});

export const {
  useGetListemployeeQuery,
  useGetemployeeByIdQuery,
  useAddemployeeMutation,
  useUpdateemployeeByIdMutation,
  useDeleteemployeeByIdMutation,
} = employeeApi;
