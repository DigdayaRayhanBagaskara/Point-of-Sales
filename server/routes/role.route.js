const express = require('express');
const rolecontroller = require('../controllers/role.controller');
const router = express.Router();
// const authMiddleware = require('../middleware/authMiddleware').default;
// const { protect } = require('../middleware/auth.js');
// const { route } = require('./employee.route.js');

//Get
router.get('/:id', rolecontroller.getById);
router.get('/', rolecontroller.get);

//Inser
//router.post('/Role/',usersController.storeRole);
router.post('/', rolecontroller.store);


//Update
//router.put('/Role/:id', usersController.updateRole);
router.put('/:id', rolecontroller.update);


//Delete
router.delete('/:id', rolecontroller.destroy);
//router.delete('/Role/:id', usersController.deleteRole);


module.exports = router;
