const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const packages = new mongoose.Schema({
    business:{
        type:String,
        required:true,
    },
    product:{
        type:String,
        required:true,
    },
    detail:String,
    location:String,
    name:{
        type:String,
        required:true,
    },
    phone_number:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
}).plugin(uniqueValidator, { message: 'Error,{PATH} is already taken' })

module.exports = Quotation = mongoose.model('Quotation',packages); 