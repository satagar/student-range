const mongoose = require('mongoose');
const pointSchema = require('./pointSchema')
const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    city: {
        type: String,
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    location: {
        type: pointSchema,
        index: true,
        required: true
    },
    createdAt: {
        type: String,
        default: () => {
            return Date.now();
        },
        immutable: true
    },
    updatedAt: {
        type: String,
        default: () => {
            return Date.now()
        }
    }
})
/*
   NOTE : when are we use location as geospatical then
   for finding the data use $near than before finding the data
   need to create that filed as index than we work with
   finding query .
*/
const userModel = mongoose.model('user', userSchema);
module.exports = userModel