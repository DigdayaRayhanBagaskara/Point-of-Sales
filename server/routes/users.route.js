const express = require('express');
const usersController = require('../controllers/users.controller.js');
const router = express.Router();
// const authMiddleware = require('../middleware/authMiddleware').default;
// const { protect } = require('../middleware/auth.js');
//Get
//router.get('/Role/:id', usersController.getByIdRole);
//router.get('/Role', usersController.showRole);
router.get('/:id', usersController.getById);
router.get('/', usersController.get);

//Inser
//router.post('/Role/',usersController.storeRole);
router.post('/', usersController.store);


//Update
//router.put('/Role/:id', usersController.updateRole);
router.put('/:id', usersController.update);


//Delete
router.delete('/:id', usersController.destroy);
//router.delete('/Role/:id', usersController.deleteRole);


module.exports = router;
