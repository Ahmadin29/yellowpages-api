const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const user_business = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'Users',
        required:true,
    },
    business:{
        type:mongoose.Types.ObjectId,
        ref:"Business",
        required:true,
    },
},{
    timestamps:true,
}).plugin(uniqueValidator, { message: 'Error,{PATH} is already taken' })

module.exports = UserBusiness = mongoose.model('UserBusiness',user_business); 