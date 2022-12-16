const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const key = require('../configs/scretKey')
const jwt = require('jsonwebtoken')
const {
    signup
} = require('../helpers/user.helper')

exports.sigup = async (req, res) => {
    if (!signup.isValidBody(req.body)) {
        return res.status(404).send({
            message: "Please Provide name , email , password ,location!"
        })
    }
    const data = {
        userId: parseInt(Math.random() * 1000),
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 9),
        location: req.body.location
    };
    if (req.body.city) {
        data.city = req.body.city
    }
    if (req.body.country) {
        data.country = req.body.country
    }
    try {
        const user = await userModel.create(data);
        return res.status(201).send({
            message: "Signup successfully!"
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: "Internal server error!"
        })
    }
}
exports.login = async (req, res) => {
    const data = req.body;
    try {
        const user = await userModel.findOne({
            email: data.email
        });
        if (!user) {
            return res.status(404).send({
                message: "user does not exists!"
            })
        }
        const isValied = bcrypt.compareSync(data.password, user.password);
        if (!isValied) {
            return res.status(401).send({
                message: "login failed due to invalied password"
            })
        }
        const token = jwt.sign({
            userId: user.userId
        }, key.scretKey, {
            expiresIn: '1d'
        })
        return res.status(200).send({
            message: "login successfully",
            userId: user.userId,
            accessToken: token
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: "Internal server error!"
        })
    }
}
exports.filter = async (req, res) => {
    const find = {};
    if (req.query.id) {
        find._id = req.query.id
    }
    if (req.query.name) {
        find.name = {
            $regex: req.query.name
        }
    }
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    if (latitude && longitude) {
        find.location = {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                },
                $minDistance: 0.10
            }
        }
    }

    try {
        const finded = await userModel.find(find);
        return res.status(200).send({
            users: finded
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: "internal server error!"
        })
    }
}
exports.update = async (req, res) => {
    const body = req.body
    try {
        const user = await userModel.findOne({
            userId: req.userId
        })
        if (body.name) {
            user.name = body.name
        }
        if (body.city) {
            user.city = body.city
        }
        if (body.country) {
            user.country = body.country
        }
        if (body.state) {
            user.state = body.state
        }
        if (body.location) {
            user.location = body.location
        }
        await user.save()
        return res.status(201).send({
            message: "user update successfully!"
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: "Internal server error!"
        })
    }
}
exports.deletes = async (req, res) => {
    try {
        const deleted = await userModel.findOneAndDelete({
            userId: req.userId
        });
        return res.status(201).send({
            message: "user delete successfully!",
            deleted_User: deleted
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: "Internal server error!"
        })
    }
}
