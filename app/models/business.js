const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const business = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
    },
    unique_code:{
        type:String,
        unique:true,
        required:true,
    },
    main_category:{
        type:mongoose.Types.ObjectId,
        ref:"SubCategories"
    },
    secondary_category:{
        type:mongoose.Types.ObjectId,
        ref:"SubCategories"
    },
    description:{
        type:String,
        required:true,
    },
    short_description:{
        type:String,
        required:true,
    },
    detail:{
        type:mongoose.Types.ObjectId,
        ref:"BusinessDetails"
    }
},{
    timestamps:true,
}).plugin(uniqueValidator, { message: 'Error,{PATH} is already taken' })

module.exports = Business = mongoose.model('Business',business); 