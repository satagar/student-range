const student = require('../models/students.model')
const route = require('../routers/student.route')
const { location } = require('../models/students.model')

exports.createStudent = async (req, res, next) => {
    try {
        const student = await student.create(req.body)
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
        const search = await student.find()
        return {
            location:
            {
                $near:
                {
                    $geometry: {
                        type: "Point",
                        coordinates: [req.body.latitude, req.body.longitude]
                    },
                }
            }
        }

    } catch (error) {
        res.status(500).json({
            error: error,
        })
    }
}

exports.updateStudent = async (req, res, next) => {
    try {
        const student = {
            name: req.body.name,
            subject: req.body.subject,
            phone: req.body.phone,
            email: req.body.email,
            location: req.body.location = {
                latitude: req.body.latitude,
                longitude: req.body.longitude
            }
        }
        const update_Student = await student.findOneAndUpdate({
            name: req.params.name,
            subject: req.params.subject,
            phone: req.params.phone,
            email: req.params.email,
            location: req.params.location = {
                latitude: req.params.latitude,
                longitude: req.params.longitude
            }
        }, student)
        res.json(update_Student)
    } catch (error) {
        res.json(error.message)
    }
}