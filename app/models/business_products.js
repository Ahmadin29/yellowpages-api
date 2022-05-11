const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const user_products = new mongoose.Schema({
    products:{
        type:mongoose.Types.ObjectId,
        ref:'Products',
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

module.exports = UserProducts = mongoose.model('UserProducts',user_products); 