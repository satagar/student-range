const express = require('express')
const { searchStudent, createStudent } = require('../controllers/studentlocal.controller')
const router = express.Router()
router.route('/').get(searchStudent).post(createStudent);
module.exports = router