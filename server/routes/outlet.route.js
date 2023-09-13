const express = require("express");
const outletController = require("../controllers/outlet.controller.js");
const router = express.Router();

//Get
router.get("/:id", outletController.getById);
router.get("/", outletController.get);

//Insert
router.post("/", outletController.store);

//Update
router.put("/:id", outletController.update);

//Delete
router.delete("/:id", outletController.destroy);

module.exports = router;
