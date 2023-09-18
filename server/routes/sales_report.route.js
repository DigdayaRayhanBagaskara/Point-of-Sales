const express = require("express");
const salesReportController = require("../controllers/sales_report.controller.js");
const router = express.Router();

router.get("/sales-summary", salesReportController.salesSummary);
router.get("/gross-profit", salesReportController.grossProfit);
router.get("/item-sales", salesReportController.itemSales);
router.get("/category-sales", salesReportController.categorySales);
router.get("/brand-sales", salesReportController.brandSales);
router.get("/discount-sales", salesReportController.discountSales);

module.exports = router;