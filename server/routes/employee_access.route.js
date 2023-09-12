const express = require("express");
const employee_accessController = require("../controllers/employee_access.controller.js");
const router = express.Router();

//Get
router.get("/:id", employee_accessController.getById);
router.get("/", employee_accessController.get);

//Insert
router.post("/", employee_accessController.store);

//Update
router.put("/:id", employee_accessController.update);

//Delete
router.delete("/:id", employee_accessController.destroy);

module.exports = router;
