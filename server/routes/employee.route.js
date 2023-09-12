const express = require("express");
const employeeController = require("../controllers/employee.controller.js");
const router = express.Router();

//Get
router.get("/:id", employeeController.getById);
router.get("/", employeeController.get);

//Insert
router.post("/", employeeController.store);

//Update
router.put("/:id", employeeController.update);

//Delete
router.delete("/:id", employeeController.destroy);

module.exports = router;
