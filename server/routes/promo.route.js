const express = require("express");
const promoController = require("../controllers/promo.controller.js");
const router = express.Router();

//Get
router.get("/:id", promoController.getById);
router.get("/", promoController.get);

//Insert
router.post("/", promoController.store);

//Update
router.put("/:id", promoController.update);

//Delete
router.delete("/:id", promoController.destroy);

module.exports = router;