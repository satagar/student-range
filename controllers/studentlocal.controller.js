const student = require('../models/students.model')
const route = require('../routers/strudent.route')

exports.createStudent = async (req, res, next) => {
    try {
        const student = await student.create(req.body);
        return res.status(200).json({
            data: student
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

exports.searchStudent = async (req, res, next) => {
    try {
        const search = await student.find();
        return res.status(200).json({
            data: student
        })
    } catch (error) {
        res.status(500).json({
            error: error,
        })
    }
}

