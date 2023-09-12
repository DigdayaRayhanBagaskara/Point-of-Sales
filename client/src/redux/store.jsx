import { configureStore } from "@reduxjs/toolkit";

// Import API
import { employeeApi } from "./services/employeeApi";
import { usersApi } from "./services/usersApi";
import { brandproductApi } from "./services/brandproductApi";
import { categoryproductApi } from "./services/categoryproductApi";
import { logmanageproductApi } from "./services/logmanagereportApi";
import { rolesApi } from "./services/rolesApi";
import { promoApi } from "./services/promoApi";
import { salesreportApi } from "./services/salesreportApi";
import { salestransactionApi } from "./services/salestransactionApi";
import { TransactionreportApi } from "./services/TransactionreportApi";
import { variantproductApi } from "./services/variantproductApi";
import { discountApi } from "./services/discountApi";
import { productApi } from "./services/productApi";
import { outletApi } from "./services/outletApi";
// Import Slice
import { categorySlice } from "./features/counter/categorySlice";
import { brandSlice } from "./features/counter/brandSlice";
import { employeeSlice } from "./features/counter/employeeSlice";
import { productSlice } from "./features/counter/productSlice";
import { discountSlice } from "./features/counter/discountSlice";
import { variantSlice } from "./features/counter/variantSlice";
import { promoSlice } from "./features/counter/promoSlice";

export const store = configureStore({
  reducer: {
    // Slice
    categorySlice: categorySlice.reducer,
    brandSlice: brandSlice.reducer,
    employeeSlice: employeeSlice.reducer,
    productSlice: productSlice.reducer,
    discountSlice: discountSlice.reducer,
    variantSlice: variantSlice.reducer,
    promoSlice: promoSlice.reducer,

    // API
    [categoryproductApi.reducerPath]: categoryproductApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [brandproductApi.reducerPath]: brandproductApi.reducer,
    [logmanageproductApi.reducerPath]: logmanageproductApi.reducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
    [salesreportApi.reducerPath]: salesreportApi.reducer,
    [salestransactionApi.reducerPath]: salestransactionApi.reducer,
    [TransactionreportApi.reducerPath]: TransactionreportApi.reducer,
    [variantproductApi.reducerPath]: variantproductApi.reducer,
    [discountApi.reducerPath]: discountApi.reducer,
    [promoApi.reducerPath]: promoApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [outletApi.reducerPath]: outletApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(categoryproductApi.middleware)
      .concat(variantproductApi.middleware)
      .concat(employeeApi.middleware)
      .concat(usersApi.middleware)
      .concat(brandproductApi.middleware)
      .concat(logmanageproductApi.middleware)
      .concat(rolesApi.middleware)
      .concat(salesreportApi.middleware)
      .concat(salestransactionApi.middleware)
      .concat(TransactionreportApi.middleware)
      .concat(discountApi.middleware)
      .concat(promoApi.middleware)
      .concat(productApi.middleware)
      .concat(outletApi.middleware),
});
