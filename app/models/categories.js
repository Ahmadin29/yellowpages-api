const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categories = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    icon:{
        type:String,
        data: Buffer,
        contentType: String
    },
    sub_categories:[{
        type:mongoose.Types.ObjectId,
        ref:"SubCategories"
    }]
},{
    timestamps:true,
}).plugin(uniqueValidator, { message: 'Error,{PATH} is already taken' })

module.exports = Categories = mongoose.model('Categories',categories); 