const express = require('express');
const Packages = require('../models/packages');

const authentication = require('../middleware/authentication');

const route = express.Router();

route.get('/',async(req,res)=>{
    try {
        
        const {page:_page,limit:_limit,search:_search} = req.query;
        
        const limit         = _limit     ? _limit : 10;
        const skip          = _page      ? (_page - 1) * limit : 0;

        const data = await Packages.find()
        .skip(skip)
        .limit(limit)
        .sort({_id:-1})

        res.json({
            status:'success',
            message:'Packages data successfully fetch',
            data:data,
            meta:{
                page:_page || 1,
                limit:limit,
            }
        })
    } catch (error) {
        res.status(422).json({
            status:'error',
            message:'Unable to fetch packages data',
            error:error,
            meta:{
                request:req.body
            }
        })
    }
})

route.post('/create',authentication,async(req,res)=>{
    try {
        const {
            name,
            description,
            features,
            price
        } = req.body;

        const query = {
            name,
            description,
            price,
            features,
        }

        const packagesModel = new Packages(query);
        await packagesModel.save();

        res.json({
            status:'success',
            message:'Packages data successfully created',
            data:packagesModel,
            meta:{
                request:req.body
            },
        })
    } catch (error) {
        res.json({
            status:'error',
            message:'Unable to create packages data, '+error,
            request:req.body,
        })
    }
})

route.delete('/:id',authentication,async(req,res)=>{
    const {id} = req.params;

    try {

        await Packages.deleteOne({
            _id:id
        })

        res.json({
            status:'success',
            message:'Package data successfully removed',
        })
    } catch (error) {
        res.status(422).json({
            status:'error',
            message:'Unable to remove package data, '+error,
        })
    }
})

route.patch('/:id',authentication,async(req,res)=>{
    try {
        const {id} = req.params;

        const {
            name,
            price,
            description,
        } = req.body;

        const current = await Packages.findById(id);

        const query = {
            name        : name || current.name,
            price       : price || current.price,
            description : description || current.description
        }

        const data = await Packages.findOneAndUpdate({_id:id},query,{
            new:true,
        })

        res.json({
            status:'success',
            message:'Package data successfully updated',
            data:data,
            meta:{
                request:req.body
            }
        })
    } catch (error) {
        res.status(422).json({
            status:'error',
            message:'Unable to update package data',
            error:error,
        })
    }
})

module.exports = route;