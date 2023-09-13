const express = require("express");
const role_controller = require("../controllers/role.controller.js");
const router = express.Router();

//Get
router.get("/:id", role_controller.getById);
router.get("/", role_controller.get);

//Insert
router.post("/", role_controller.store);

//Update
router.put("/:id", role_controller.update);

//Delete
router.delete("/:id", role_controller.destroy);

module.exports = router;
