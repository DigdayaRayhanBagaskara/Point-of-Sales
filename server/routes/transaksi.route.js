const express = require("express");
const transaksiController = require("../controllers/transaksi.controller.js");
const router = express.Router();

//Get
router.get("/:id", transaksiController.getById);
router.get("/", transaksiController.get);

//Insert
router.post("/", transaksiController.store);

//Update
router.put("/:id", transaksiController.update);

//Delete
router.delete("/:id", transaksiController.destroy);

module.exports = router;
