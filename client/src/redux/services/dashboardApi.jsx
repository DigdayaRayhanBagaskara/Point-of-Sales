import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/dashboard", 
  }),
  endpoints: (builder) => ({
    getGrossSalesDashboard: builder.query({
      query: (params) => `/gross_sales?${serialize(params)}`,
    }),
    getNetSalesDashboard: builder.query({
      query: (params) => `/net_sales?${serialize(params)}`,
    }),
    getCountTransactionDashboard: builder.query({
      query: (params) => `/count_transaction?${serialize(params)}`,
    }),
    getHourlyGrossSalesAmountDashboard: builder.query({
      query: (params) => `/hourly_gross_sales_amount?${serialize(params)}`,
    }),
    getTopItemDashboard: builder.query({
      query: (params) => `/top_item?${serialize(params)}`,
    }),
    getTopItemByVolumeDashboard: builder.query({
      query: (params) => `/top_item_by_volume?${serialize(params)}`,
    }),
    getTopItemBySalesDashboard: builder.query({
      query: (params) => `/top_item_by_sales?${serialize(params)}`,
    }),

  }),
});

export const {
  useGetGrossSalesDashboardQuery,
  useGetNetSalesDashboardQuery,
  useGetCountTransactionDashboardQuery,
  useGetHourlyGrossSalesAmountDashboardQuery,
  useGetTopItemDashboardQuery,
  useGetTopItemByVolumeDashboardQuery,
  useGetTopItemBySalesDashboardQuery,
} = dashboardApi;
