const express = require("express");
const dashboardController = require("../controllers/dashboard.controller.js");
const router = express.Router();

//Get Gross Sales
router.get("/gross_sales", dashboardController.grossSales);
router.get("/net_sales", dashboardController.netSales);
router.get("/count_transaction", dashboardController.countTransaction);
router.get("/hourly_gross_sales_amount", dashboardController.hourlyGrossSalesAmount);
router.get("/top_item", dashboardController.topItem);
router.get("/top_item_by_volume", dashboardController.topItemByVolume);
router.get("/top_item_by_sales", dashboardController.topItemBySales);



module.exports = router;