const express = require('express');
const usersController = require('../controllers/users.controller.js');
const router = express.Router();
// const authMiddleware = require('../middleware/authMiddleware').default;
const { protect } = require('../middleware/auth.js');
//Get
router.get('/:id', usersController.getById);
router.get('/', protect, usersController.get);

//Inser
router.post('/', usersController.store);


//Update
router.put('/:id', protect, usersController.update);


//Delete
router.delete('/:id', usersController.destroy);


module.exports = router;
