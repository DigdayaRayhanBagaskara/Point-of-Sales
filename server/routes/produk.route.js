const express = require("express");
const produkController = require("../controllers/produk.controller.js");

const router = express.Router();

//Get
router.get("/:id", produkController.getById);
router.get("/", produkController.get);

//Insert
router.post("/", produkController.upload.single('gambar_produk') ,produkController.store);

//Update
router.put("/:id", produkController.update);

//Delete
router.delete("/:id", produkController.destroy);

module.exports = router;
