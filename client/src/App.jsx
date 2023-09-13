/* eslint-disable react/prop-types */

// Pages
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SalesSummary = lazy(() =>
  import("./pages/Report/Salesreport/component/SalesSummary")
);
const GrossProfit = lazy(() =>
  import("./pages/Report/Salesreport/component/GrossProfit")
);

// const RequireAuth = lazy(() =>
//   import("./pages/Auth/authComponents/RequireAuth")
// );
// const LoginAuth = lazy(() => import("./pages/Auth/authComponents/LoginAuth"));

const Layout = lazy(() => import("./components/layout/Layout"));
const LayoutAdmin = lazy(() => import("./components/layout/LayoutAdmin"));
// const LayoutSuperAdmin = lazy(() =>
//   import("./components/layout/LayoutSuperAdmin")
// );
// const Layoutkasir = lazy(() => import("./components/layout/LayoutCasir"));
const Discount = lazy(() => import("./pages/Event/Discount/Discount"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Categoryproduct = lazy(() =>
  import("./pages/Master/Categoryproduct/Category")
);
const Brandproduct = lazy(() =>
  import("./pages/Master/Brandproduct/Brandproduct")
);
const Product = lazy(() => import("./pages/Master/Product/Product"));
const Auth = lazy(() => import("./pages/Auth/Login"));
const LogManageReport = lazy(() =>
  import("./pages/Report/Logmanagementreport/Logmanareport")
);
const SalesReport = lazy(() =>
  import("./pages/Report/Salesreport/Salesreport")
);
const TransactionReport = lazy(() =>
  import("./pages/Report/Transactionreport/Transactionreport")
);
const Roles = lazy(() => import("./pages/Master/Roles/Roles"));
const Varian = lazy(() =>
  import("./pages/Master/Variantproduct/Varianproduct")
);
const SalesTransaction = lazy(() =>
  import("./pages/Transaction/Salestransaction/Salentransaction")
);
const StrukTransaction = lazy(() =>
  import("./pages/Transaction/Struktransaction/Struk")
);

const Employee = lazy(() => import("./pages/Master/Employee/Employee"));

const Users = lazy(() => import("./pages/Master/Users/Users"));

const Promo = lazy(() => import("./pages/Event/Promo/Promo"));

const ProdukVarian = lazy(() =>
  import("./pages/Master/Variantproduct/Varianproduct")
);
const App = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          {/* Layout Home */}

          {/* <Route element={<Layout />}> */}
          <Route path="/login" element={<Auth />} />
          {/* Layout Super Admin
          <Route element={<LayoutSuperAdmin />}>
            <Route path="" element={<Auth />} />
          </Route>
          Layout Kasir
          <Route element={<Layoutkasir />}>
            <Route path="" element={<Auth />} />
          </Route> */}
          {/* Layout Admin */}
          <Route element={<LayoutAdmin />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/users" element={<Users />} />
            <Route path="/discount" element={<Discount />} />
            <Route path="/promo" element={<Promo />} />
            <Route path="/brand-produk" element={<Brandproduct />} />
            <Route path="/categories" element={<Categoryproduct />} />
            <Route path="/product-varian" element={<ProdukVarian />} />
            <Route path="/product" element={<Product />} />
            <Route
              path="/log-management-report"
              element={<LogManageReport />}
            />
            <Route path="/variant" element={<Varian />} />

            {/* Sales Report */}
            <Route path="/sales-report" element={<SalesReport />}>
              <Route index element={<SalesSummary />} />
              <Route
                path="/sales-report/sales-summary"
                element={<SalesSummary />}
              />
              <Route
                path="/sales-report/gross-profit"
                element={<GrossProfit />}
              />
            </Route>

            <Route path="/transaction-report" element={<TransactionReport />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/sales-transaction" element={<SalesTransaction />} />
            <Route path="/struk-transaction" element={<StrukTransaction />} />
          </Route>
        </Routes>
        <ToastContainer />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
