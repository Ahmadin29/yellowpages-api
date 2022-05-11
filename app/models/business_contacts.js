const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const business_contacts = new mongoose.Schema({
    business_id:{
        type:mongoose.Types.ObjectId,
        ref:"Business",
    },
    person_name:{
        type:String,
        required:true,
        unique:true,
    },
    person_phone_number:String,
    person_address:String,
    website:String,
},{
    timestamps:true,
}).plugin(uniqueValidator, { message: 'Error,{PATH} is already taken' })

module.exports = BusinessContacts = mongoose.model('BusinessContacts',business_contacts); 