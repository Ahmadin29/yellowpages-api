const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const user_details = new mongoose.Schema({
    user_id:mongoose.Types.ObjectId,
    address:String,
    date_of_birth:Date,
    state:Object,
    city:Object,
    district:Object,
    zip_code:String,
},{
    timestamps:true,
}).plugin(uniqueValidator, { message: 'Error,{PATH} is already taken' })

module.exports = UserDetails = mongoose.model('UserDetails',user_details); 