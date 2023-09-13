const express = require("express");
const app = express();
const router = express.Router();

const authRouter = require("./auth.route");
const roleRouter = require("./role.route.js");
const usersRouter = require("./users.route.js");
const produkRouter = require("./produk.route.js");
const discountRouter = require("./discount.route.js");
const promoRouter = require("./promo.route.js");
const brand_produkRouter = require("./brand_produk.route.js");
const categoriesRouter = require("./categories.route.js");
const employeeRouter = require("./employee.route.js");
const employee_accessRouter = require("./employee_access.route.js");
const transaksiRouter = require("./transaksi.route.js");
// const variantRouter = require("./variant.route.js");
const dashboardRouter = require("./dashboard.route.js");
const salesReportRouter = require("./sales_report.route.js");
const transactionReportRouter = require("./transaction_report.route.js");

router.use("/auth", authRouter);
router.use("/role", roleRouter);
router.use("/users", usersRouter);
router.use("/produk", produkRouter);
router.use("/discount", discountRouter);
router.use("/brand-produk", brand_produkRouter);
router.use("/categories", categoriesRouter);
router.use("/employee", employeeRouter);
router.use("/employee-access", employee_accessRouter);
router.use("/promo", promoRouter);
router.use("/transaksi", transaksiRouter);
// router.use("/variant", variantRouter);
router.use("/dashboard", dashboardRouter);
router.use("/sales-report", salesReportRouter);
router.use("/transaction-report", transactionReportRouter);

module.exports = router;


