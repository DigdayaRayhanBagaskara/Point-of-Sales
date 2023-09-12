const express = require('express');
const authcontroller = require('../controllers/auth.controller');
const router = express.Router();

//Login dan Logout
router.post('/login', authcontroller.login);
router.post('/logout', authcontroller.logout);

module.exports = router;