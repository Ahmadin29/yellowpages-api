const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const packages = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    description:String,
    features:Array,
},{
    timestamps:true,
}).plugin(uniqueValidator, { message: 'Error,{PATH} is already taken' })

module.exports = Packages = mongoose.model('Packages',packages); 