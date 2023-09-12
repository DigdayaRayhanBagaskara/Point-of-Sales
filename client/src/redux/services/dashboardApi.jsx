import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/dashboard",
  }),
  endpoints: (builder) => ({
    getGrossSalesDashboard: builder.query({
      query: (params) => `/gross_sales`,
    }),
    getNetSalesDashboard: builder.query({
      query: (params) => `/net_sales`,
    }),
    getCountTransactionDashboard: builder.query({
      query: (params) => `/count_transaction`,
    }),
    getHourlyGrossSalesAmountDashboard: builder.query({
      query: (params) => `/hourly_gross_sales_amount`,
    }),
    getTopItemDashboard: builder.query({
      query: (params) => `/top_item`,
    }),
    getTopItemByVolumeDashboard: builder.query({
      query: (params) => `/top_item_by_volume`,
    }),
    getTopItemBySalesDashboard: builder.query({
      query: (params) => `/top_item_by_sales`,
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
