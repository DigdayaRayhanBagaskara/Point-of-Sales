const express = require("express");

const brand_produkController = require("../controllers/brand_produk.controller.js");
const router = express.Router();

//Get
router.get("/:id", brand_produkController.getById);
router.get("/", brand_produkController.get);

//Insert
router.post("/", brand_produkController.store);

//Update
router.put("/:id", brand_produkController.update);

//Delete
router.delete("/:id", brand_produkController.destroy);

module.exports = router;
