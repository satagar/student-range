const express = require('express')
const { searchStudent, createStudent, updateStudent } = require('../controllers/studentlocal.controller')
const router = express.Router()
router.route('/').get(searchStudent).post(createStudent).put(updateStudent);
module.exports = router