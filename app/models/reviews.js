const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const packages = new mongoose.Schema({
    business:{
        type:String,
        required:true,
    },
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
    },
    description:{
        type:String,
        required:true,
    },
    rate:{
        type:Number,
        required:true,
    }
},{
    timestamps:true,
}).plugin(uniqueValidator, { message: 'Error,{PATH} is already taken' })

module.exports = Quotation = mongoose.model('Quotation',packages); 