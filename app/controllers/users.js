const express = require('express');
const Users = require('../models/users');
const SHA256 = require("crypto-js/sha256");
const authentication = require('../middleware/authentication');
const UserDetails = require('../models/user_details');
// const onlyAdmin = require('../middleware/onlyAdmin');

const route = express.Router();

route.get('/',authentication,async(req,res)=>{
    try {
        const data = await Users.findOne({_id:req.user._id}).populate('detail_id')

        res.json({
            status:'success',
            message:'User data successfully fetch',
            data:data,
        })
    } catch (error) {
        res.json({
            status:'error',
            message:'Unable to fetch user data, '+error,
            request:req.body,
        })
    }
})

route.get('/all',async(req,res)=>{
    try {

        const {page:_page,limit:_limit,search:_search} = req.query;

        const limit         = _limit     ? _limit : 10;
        const skip          = _page      ? (_page - 1) * limit : 0;

        const data = await Users.find()
        .or(
            [
                {
                    name:new RegExp(_search,'i')
                },
                {
                    username:new RegExp(_search,'i')
                },
            ]
        ).select('-token -password')
        .skip(skip)
        .limit(limit)
        .sort({_id:-1})

        res.json({
            status:'success',
            message:'User data fetched successfully',
            data:data,
        })
    } catch (error) {
        res.json({
            status:'error',
            message:'Unable to fetch users data, '+error,
            request:req.body,
        })
    }
})

route.post('/login',async(req,res)=>{
    try {

        const { password,username } = req.body;

        if (!password || !username ){
            res.status(422).json({
                message :"Unable to authorize your data, make sure your username and password correct",
                status  :'error'
            })
            return;
        }

        const data = await Users.findOne({
            username:username,
            password:SHA256(password).toString(),
        }).exec();

        if (!data) {
            res.status('401').json({
                status:'error',
                message:'Unable to authorizing your data, user not founded',
                request:req.body,
            })
            return
        }

        res.json({
            status:'success',
            message:'User authorized successfully',
            data:data,
            request:req.body,
        })
    } catch (error) {
        res.status('401').json({
            status:'error',
            message:'Unable to authorizing your data, '+error,
            request:req.body,
        })
    }
})

route.post('/create',async(req,res)=>{
    try {
        const { 
            name,
            password,
            username,
            email,
            role:_role,
            phone_number,
            details,
        } = req.body;

        const role = _role ? _role : 'user'

        const user_details = {
            address:details?.address,
            date_of_birth:Date(details?.date_of_birth),
            state:details?.state,
            city:details?.city,
            district:details?.district,
        }

        const userDetailsModel = new UserDetails(user_details);

        await userDetailsModel.save();

        const user = {
            name,
            password:SHA256(password),
            username,
            email,
            role:role,
            phone_number:phone_number,
            token:SHA256(username+'*'+password+"*"+role),
            detail_id:userDetailsModel._id
        }

        const userModel = new Users(user);
        await userModel.save();

        res.json({
            status  : 'success',
            message : 'User data successfully saved',
            data    : userModel,
            meta    : req.body,
        });
    } catch (error) {

        console.log(error);

        res.status(422).json({
            status  : 'error',
            message : 'Unable to registering user',
            data    : error
        });
    }
})

route.patch('/:id',async(req,res)=>{

    const {id} = req.params;
    const {
        name,
        password,
        username,
        email,
        role:_role,
        phone_number,
        details,
    } = req.body;

    try {

        const user = await Users.findOne({
            _id:id
        })

        const user_query = {
            "name"          : name,
            "username"      : username,
            "password"      : password ? SHA256(password) : user.password,
            "email"         : email,
            "phone_number"  : phone_number,
            "role"          : _role,
        }

        const user_details_query = {
            address:details?.address,
            date_of_birth:Date(details?.date_of_birth),
            state:details?.state,
            city:details?.city,
            district:details?.district,
        }

        await UserDetails.findOneAndUpdate({_id:user.detail_id},user_details_query,{
            new:true,
        })

        const data = await Users.findByIdAndUpdate(id,user_query,{
            new:true,
        }).populate('detail_id')

        res.json({
            status:'success',
            message:'User data updated successfully',
            data:data,
            request:req.body
        })
    } catch (error) {
        res.status(400).json({
            status:'error',
            message:'Unable to update user data, '+error,
        })
    }
})

route.delete('/:id',async(req,res)=>{

    const {id} = req.params;

    try {

        await Users.deleteOne({
            _id:id
        })

        res.json({
            status:'success',
            message:'User data successfully removed',
        })
    } catch (error) {
        res.status(422).json({
            status:'error',
            message:'Unable to remove user data, '+error,
        })
    }
})

module.exports = route;