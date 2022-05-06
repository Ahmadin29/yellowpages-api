const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const users = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Your Name must be filed, please check your input'],
    },
    email:{
        type:String,
        required:[true,'Your Email must be filed, please check your input'],
        unique:true,
    },
    phone_number:{
        type:String,
        required:[true,'Your Phone Number must be filed, please check your input'],
        unique:true,
    },
    username:{
        type:String,
        required:[true,'Your Username must be filed, please check your input'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Your Password must be filed, please check your input'],
    },
    token:{
        type:String,
        required:[true,'Your Token must be filed, please check your input'],
    },
    role:{
        type:String,
        required:[true,'Your Role must be filed, please check your input'],
    },
    last_login:{
        type:Date,
    },
    detail_id:{
        type:mongoose.Types.ObjectId,
        ref:"UserDetails"
    },
},{
    timestamps:true,
}).plugin(uniqueValidator, { message: 'Error,{PATH} is already taken' })

module.exports = User = mongoose.model('users',users); 