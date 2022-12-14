const express = require('express');
const userController = require('../../../controllers/user.controller')
const {isValieduser} = require('../../../middleware/authValidate.middleware')
const route = express.Router();
//-------------------------------signup routes || login routes----------------
route.post('/signup',userController.sigup)
route.post('/login',userController.login);

//---------------------------------------user find -------------------------------
route.get('/user/filter',isValieduser,userController.filter);
module.exports = route;