import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "../../utility/helpers";

export const salesreportApi = createApi({
  reducerPath: "salesreportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/sales-report",
  }),
  endpoints: (builder) => ({
    getSRSalesSummary: builder.query({
      query: (params) => `/sales-summary?${serialize(params)}`,
    }),
    getSRGrossProfit: builder.query({
      query: (params) => `/gross-profit?${serialize(params)}`,
    }),
    getSRItemSales: builder.query({
      query: (params) => `/item-sales?${serialize(params)}`,
    }),
    getSRCategorySales: builder.query({
      query: (params) => `/category-sales?${serialize(params)}`,
    }),
    getSRBrandSales: builder.query({
      query: (params) => `/brand-sales?${serialize(params)}`,
    }),
    getSRDiscountSales: builder.query({
      query: (params) => `/discount-sales?${serialize(params)}`,
    }),
    
    
    
  }),
});

export const {
  useGetSRGrossProfitQuery,
  useGetSRSalesSummaryQuery,
  useGetSRItemSalesQuery,
  useGetSRCategorySalesQuery,
  useGetSRBrandSalesQuery,
  useGetSRDiscountSalesQuery,
} = salesreportApi;
