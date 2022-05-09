const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const user_packages = new mongoose.Schema({
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:'Users'
    },
    package_id:{
        type:mongoose.Types.ObjectId,
        ref:"Packages",
        required:true,
    },
    valid_until:Date,
},{
    timestamps:true,
}).plugin(uniqueValidator, { message: 'Error,{PATH} is already taken' })

module.exports = UserPackages = mongoose.model('UserPackages',user_packages); 