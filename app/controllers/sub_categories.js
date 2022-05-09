const express = require('express');

const authentication = require('../middleware/authentication');
const SubCategories = require('../models/sub_categories');

const route = express.Router();

route.get('/',async(req,res)=>{
    try {
        
        const {page:_page,limit:_limit,search:_search} = req.query;
        const parent_id = req.parent_id;
        
        const limit         = _limit     ? _limit : 10;
        const skip          = _page      ? (_page - 1) * limit : 0;

        const data = await Categories.findOne({_id:parent_id})
        .populate('sub_categories')
        .skip(skip)
        .limit(limit)
        .sort({_id:-1})

        res.json({
            status:'success',
            message:'Categories and sub data successfully fetch',
            data:data,
            meta:{
                page:_page || 1,
                limit:limit,
            }
        })
    } catch (error) {
        res.status(422).json({
            status:'error',
            message:'Unable to fetch categories and sub data, '+error,
            request:req.body,
        })
    }
})

route.post('/create',authentication,async(req,res)=>{
    try {

        const category = await Categories.findById(req.parent_id)
        .populate({
            path:'SubCategories',
            strictPopulate:false
        })

        const { 
            name,
        } = req.body;
    
        const query = {
            name:name,
            parent_category:req.parent_id,
        }
    
        const subcategoriesModel = new SubCategories(query);
        await subcategoriesModel.save();

        category.sub_categories.push(subcategoriesModel);
        await category.save();
    
        res.json({
            status  : 'success',
            message : 'Sub Categories data successfully saved',
            data    : category,
            meta    : {
                request:req.body
            },
        });
    } catch (error) {
        res.status(422).json({
            status  : 'error',
            message : 'Unable to save sub categories data',
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

        const current = await SubCategories.findById(id)

        const query = {
            name:name || current.name,
        }

        const data = await SubCategories.findOneAndUpdate({_id:id},query,{
            new:true,
        }).populate('parent_category')

        res.json({
            status:'success',
            message:'Sub Category data successfully updated',
            data:data,
            meta:{
                request:req.body
            }
        })
    } catch (error) {

        console.log(error);

        res.status(422).json({
            status:'error',
            message:'Unable to update sub category data',
            error:error,
        })
    }
})

route.delete('/:id',authentication,async(req,res)=>{
    const {id} = req.params;

    try {

        await SubCategories.deleteOne({
            _id:id
        })

        res.json({
            status:'success',
            message:'sub category data successfully removed',
        })
    } catch (error) {
        res.status(422).json({
            status:'error',
            message:'Unable to remove sub category data',
            error:error,
        })
    }
})

module.exports = route;