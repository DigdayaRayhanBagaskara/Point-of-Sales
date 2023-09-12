const express = require("express");
const discountController = require("../controllers/discount.controller.js");
const router = express.Router();

//Get
router.get("/:id", discountController.getById);
router.get("/", discountController.get);

//Insert
router.post("/", discountController.store);

//Update
router.put("/:id", discountController.update);

//Delete
router.delete("/:id", discountController.destroy);

module.exports = router;
