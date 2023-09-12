const express = require("express");
const transactionReportController = require("../controllers/transaction_report.controller.js");
const router = express.Router();

//Get
// router.get("/:id", discountController.getById);
router.get("/", transactionReportController.transactionReport);

//Insert
// router.post("/", discountController.store);

//Update
// router.put("/:id", discountController.update);

//Delete
// router.delete("/:id", discountController.destroy);

module.exports = router;