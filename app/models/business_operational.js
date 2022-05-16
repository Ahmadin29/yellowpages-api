const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const business_operationals = new mongoose.Schema({
    business_id:{
        type:mongoose.Types.ObjectId,
        ref:"Business",
    },
    day:{
        type:String,
        required:true,
    },
    day_order:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
}).plugin(uniqueValidator, { message: 'Error,{PATH} is already taken' })

module.exports = BusinessOperationals = mongoose.model('BusinessOperationals',business_operationals); 