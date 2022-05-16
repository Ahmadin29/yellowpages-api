const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const packages = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    description:String,
},{
    timestamps:true,
}).plugin(uniqueValidator, { message: 'Error,{PATH} is already taken' })

module.exports = Products = mongoose.model('Products',packages); 