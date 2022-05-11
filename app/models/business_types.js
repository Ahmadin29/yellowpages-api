const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const business_types = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    }
},{
    timestamps:true,
}).plugin(uniqueValidator, { message: 'Error,{PATH} is already taken' })

module.exports = BusinessTypes = mongoose.model('BusinessTypes',business_types); 