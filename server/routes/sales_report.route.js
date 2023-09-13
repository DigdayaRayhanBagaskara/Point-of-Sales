const express = require("express");
const salesReportController = require("../controllers/sales_report.controller.js");
const router = express.Router();

//Get
// router.get("/:id", discountController.getById);
router.get("/", salesReportController.salesReport);

//Insert
// router.post("/", discountController.store);

//Update
// router.put("/:id", discountController.update);

//Delete
// router.delete("/:id", discountController.destroy);

module.exports = router;