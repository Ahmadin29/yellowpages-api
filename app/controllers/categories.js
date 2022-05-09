const express = require('express');

const authentication = require('../middleware/authentication');
const Categories = require('../models/categories');

const route = express.Router();

route.get('/',async(req,res)=>{
    try {
        
        const {page:_page,limit:_limit,search:_search} = req.query;
        
        const limit         = _limit     ? _limit : 10;
        const skip          = _page      ? (_page - 1) * limit : 0;

        const data = await Categories.find()
        .skip(skip)
        .limit(limit)
        .sort({_id:-1})

        res.json({
            status:'success',
            message:'Categories data successfully fetch',
            data:data,
            meta:{
                page:_page || 1,
                limit:limit,
            }
        })
    } catch (error) {
        res.status(422).json({
            status:'error',
            message:'Unable to fetch categories data, '+error,
            request:req.body,
        })
    }
})

route.post('/create',authentication,async(req,res)=>{
    try {

        const { 
            name,
        } = req.body;
    
        const query = {
            name:name,
            sub_categories:[],
        }
    
        const categoriesModel = new Categories(query);
        await categoriesModel.save();
    
        res.json({
            status  : 'success',
            message : 'Categories data successfully saved',
            data    : categoriesModel,
            meta    : {
                request:req.body
            },
        });
    } catch (error) {
        res.status(422).json({
            status  : 'error',
            message : 'Unable to save categories data',
            error   : error,
        });
    }
})

route.patch('/:id',authentication,async(req,res)=>{
    try {
        const {id} = req.params;

        const {
            name,
        } = req.body;

        const current = await Categories.findById(id)

        const query = {
            name:name || current.name,
        }

        const data = await Categories.findOneAndUpdate({_id:id},query,{
            new:true,
        })

        res.json({
            status:'success',
            message:'Category data successfully updated',
            data:data,
            meta:{
                request:req.body
            }
        })
    } catch (error) {
        res.status(422).json({
            status:'error',
            message:'Unable to update category data',
            error:error,
        })
    }
})

route.delete('/:id',authentication,async(req,res)=>{
    const {id} = req.params;

    try {

        await Categories.deleteOne({
            _id:id
        })

        res.json({
            status:'success',
            message:'category data successfully removed',
        })
    } catch (error) {
        res.status(422).json({
            status:'error',
            message:'Unable to remove category data',
            error:error,
        })
    }
})

module.exports = route;