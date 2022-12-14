const mongoose = require('mongoose');
const pointSchema = require('./poinSchema')
const userSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    city :{
        type:String,
    },
    country:{
        type:String
    },
    state:{
        type:String
    },
    location:{
        type:pointSchema,
        required:true
    },
    createdAt:{
        type:String,
        default:()=>{
            return Date.now();
        },
      immutable:true
    },
    updatedAt:{
        type:String,
        default:()=>{
            return Date.now()
        }
    }
})
const userModel = mongoose.model('user',userSchema);
module.exports = userModel