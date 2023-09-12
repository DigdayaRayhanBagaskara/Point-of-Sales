const express = require("express");
const salesTransactionController = require("../controllers/sales_transaction.controller.js");
const router = express.Router();

//Get
// router.get("/:id", discountController.getById);
// router.get("/", salesTransactionController.salesTranscation);

//Insert
router.post("/", salesTransactionController.store);

//Delete
router.delete("/:id", salesTransactionController.destroy);

module.exports = router;
