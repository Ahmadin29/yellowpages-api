const express = require('express');
const Business = require('../models/business');
const authentication = require('../middleware/authentication');
const BusinessTypesRoutes = require('./business_types');
const BusinessDetails = require('../models/business_details');
const BusinessContacts = require('../models/business_contacts');
const BusinessOperationals = require('../models/business_operational');
const UserBusiness = require('../models/user_business');

const route = express.Router();


route.get('/',async(req,res)=>{
    try {

        const {page:_page,limit:_limit,search:_search} = req.query;
        
        const limit         = _limit     ? _limit : 10;
        const skip          = _page      ? (_page - 1) * limit : 0;

        const data = await Business.find()
        .populate('main_category')
        .populate('secondary_category')
        .populate('detail')
        .skip(skip)
        .limit(limit)
        .sort({_id:-1});

        res.json({
            status:'success',
            message:'Business data successfully fetch',
            data:data,
            meta:{
                page:_page || 1,
                limit:limit,
            }
        })
    } catch (error) {
        res.json({
            status:'error',
            message:'Unable to fetch business data, '+error,
            request:req.body,
        })
    }
})

route.post('/create',authentication,async(req,res)=>{
    try {
        const {
            name,
            main_category_id,
            secondary_category_id,
            description,
            short_description,
    
            business_type_id,
            business_contacts,
            operational_schedules,
    
            gst_number,
            phone_number,
            address,
            state_id,
            district_id,
            town_id,
            area_id,
    
            year_established,
    
            user_id
        } = req.body;
    
        const business = {
            name:name,
            main_category:main_category_id,
            secondary_category:secondary_category_id,
            description:description,
            short_description:short_description,
        }
    
        const BusinessModel = new Business(business);
    
        const business_id = BusinessModel._id;
    
        //Add contacts Start
        const contacts = new Array();
    
        business_contacts && Array.isArray(business_contacts) && business_contacts.map(async(value)=>{
            try {
                const contact = {
                    business_id:business_id,
                    person_name:value.name,
                    person_job_title:value.job_title,
                    person_phone_number:value.phone_number,
                    person_address:value.address,
                    website:value.website,
                }
        
                const BusinessContactsModel = new BusinessContacts(contact)
        
                contacts.push(BusinessContactsModel._id);
                await BusinessContactsModel.save();
            } catch (error) {
                throw error
            }
        })
        //Add contacts End
    
        //Add Operationals Start
        const operationals = new Array();
    
        operational_schedules && Array.isArray(operational_schedules) && operational_schedules.map(async(value)=>{
            try {
                const operational = {
                    business_id:business_id,
                    day:value.day,
                    day_order:value.day_order,
                    time:value.time,
                }
        
                const BusinessOperationalsModel = new BusinessOperationals(operational);
        
                operationals.push(BusinessOperationalsModel._id);
        
                await BusinessOperationalsModel.save();
            } catch (error) {
                throw error
            }
        })
        //Add Operationals End
    
        const business_details = {
            business_id:business_id,
            business_type:business_type_id,
            business_contacts:contacts,
            operational_schedule:operationals,
            gst_number:gst_number,
            phone_number:phone_number,
            address:address,
    
            state:state_id,
            district:district_id,
            town:town_id,
            area:area_id,
    
            year_established:year_established,
        }
    
        const BusinessDetailsModels = new BusinessDetails(business_details);
        await BusinessDetailsModels.save();
    
        BusinessModel.detail = BusinessDetailsModels._id;
        BusinessModel.unique_code = "Business-"+business_id.toString().slice(-3);
    
        const user_business = {
            business:BusinessModel._id,
            user:req.role == 'users' ? req.user._id : user_id,
        }
    
        const UserBusinessModel = new UserBusiness(user_business);
        await UserBusinessModel.save();
    
        await BusinessModel.save();

        res.json({
            status  : 'success',
            message : 'Business data successfully saved',
            data    : BusinessModel,
            meta    : {
                request:req.body
            },
        });
        
    } catch (error) {
        res.status(422).json({
            status  : 'error',
            message : 'Unable to save business data',
            error   : error,
        });
    }
})

route.use('/types',BusinessTypesRoutes)

module.exports = route;