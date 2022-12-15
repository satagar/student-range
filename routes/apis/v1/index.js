const express = require('express');
const userController = require('../../../controllers/user.controller')
const {
    isValieduser
} = require('../../../middleware/authValidate.middleware')
const route = express.Router();
//-------------------------------signup routes || login routes----------------
route.post('/signup', userController.sigup)
route.post('/login', userController.login);

//---------------------------------------user find -------------------------------
route.get('/user/filter', isValieduser, userController.filter);
route.put('/user/update', isValieduser, userController.update)
route.delete('/user/delete', isValieduser, userController.deletes)

module.exports = route;