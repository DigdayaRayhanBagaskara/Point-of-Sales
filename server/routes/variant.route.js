const express = require("express");
const variantController = require("../controllers/variant.controller.js");
const router = express.Router();

//Get
router.get("/:id", variantController.getById);
router.get("/", variantController.get);

//Insert
router.post("/", variantController.store);

//Update
router.put("/:id", variantController.update);

//Delete
router.delete("/:id/:id_produk", variantController.destroy);

module.exports = router;
