const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const business_details = new mongoose.Schema({
    business_id:{
        type:mongoose.Types.ObjectId,
        ref:"Business",
    },
    business_type:{
        type:mongoose.Types.ObjectId,
        ref:"BusinessTypes"
    },
    business_contacts:[{
        type:mongoose.Types.ObjectId,
        ref:"BusinessContacts"
    }],
    operational_schedule:[{
        type:mongoose.Types.ObjectId,
        ref:"BusinessOperationalSchedules"
    }],
    gst_number:String,
    phone_number:String,
    address:String,
    state:Object,
    city:Object,
    district:Object,
    year_established:Date,
    social_media:[{
        type:mongoose.Types.ObjectId,
        ref:"BusinessSocialMedia"
    }]
},{
    timestamps:true,
}).plugin(uniqueValidator, { message: 'Error,{PATH} is already taken' })

module.exports = BusinessDetails = mongoose.model('BusinessDetails',business_details); 