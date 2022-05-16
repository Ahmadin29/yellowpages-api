const express = require('express');
const BusinessTypes = require('../models/business_types');
const authentication = require('../middleware/authentication');

const route = express.Router();

route.get('/',async(req,res)=>{
    try {

        const {page:_page,limit:_limit,search:_search} = req.query;
        
        const limit         = _limit     ? _limit : 10;
        const skip          = _page      ? (_page - 1) * limit : 0;

        const data = await BusinessTypes.find()
        .skip(skip)
        .limit(limit)
        .sort({_id:-1});

        res.json({
            status:'success',
            message:'Business types data successfully fetch',
            data:data,
            meta:{
                page:_page || 1,
                limit:limit,
            }
        })
    } catch (error) {
        res.json({
            status:'error',
            message:'Unable to fetch business types data, '+error,
            request:req.body,
        })
    }
})

route.post('/create',authentication,async (req,res)=>{
    try {

        const { 
            name,
        } = req.body;
    
        const query = {
            name:name,
        }
    
        const BusinessTypesModel = new BusinessTypes(query);
        await BusinessTypesModel.save();
    
        res.json({
            status  : 'success',
            message : 'Business Types data successfully saved',
            data    : BusinessTypesModel,
            meta    : {
                request:req.body
            },
        });
    } catch (error) {
        res.status(422).json({
            status  : 'error',
            message : 'Unable to save business types data',
            error   : error,
        });
    }
})

route.delete('/:id',authentication,async (req,res)=>{
    const {id} = req.params;

    try {

        await BusinessTypes.deleteOne({
            _id:id
        })

        res.json({
            status:'success',
            message:'Business types data successfully removed',
        })
    } catch (error) {
        res.status(422).json({
            status:'error',
            message:'Unable to remove business types data',
            error:error,
        })
    }
})

route.patch('/:id',authentication,async (req,res)=>{
    try {
        const {id} = req.params;

        const {
            name,
        } = req.body;

        const current = await BusinessTypes.findById(id)

        const query = {
            name:name || current.name,
        }

        const data = await BusinessTypes.findOneAndUpdate({_id:id},query,{
            new:true,
        })

        res.json({
            status:'success',
            message:'Business type data successfully updated',
            data:data,
            meta:{
                request:req.body
            }
        })
    } catch (error) {
        res.status(422).json({
            status:'error',
            message:'Unable to update business type data',
            error:error,
        })
    }
})

module.exports = route;