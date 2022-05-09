const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const sub_categories = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    icon:{
        type:String,
    },
    parent_category:{
        type:mongoose.Types.ObjectId,
        ref:"Categories"
    }
},{
    timestamps:true,
}).plugin(uniqueValidator, { message: 'Error,{PATH} is already taken' })

module.exports = SubCategories = mongoose.model('SubCategories',sub_categories); 