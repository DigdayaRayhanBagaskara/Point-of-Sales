const express = require("express");
const categoriesController = require("../controllers/categories.controller.js");
const router = express.Router();

//Get
router.get("/:id", categoriesController.getById);
router.get("/", categoriesController.get);

//Insert
router.post("/", categoriesController.store);

//Update
router.put("/:id", categoriesController.update);

//Delete
router.delete("/:id", categoriesController.destroy);

module.exports = router;
