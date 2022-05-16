const express = require('express');
const router = express.Router();
const Users = require('../models/users');

router.use(async (req,res,next)=>{

    try {
        const users = await Users.findOne({
            token:req.headers['token'],
        }).exec();

        if (users) {
            req.user = users;
            req.role = 'users';
            next();
        }else{
            throw "user not found"
        }
    } catch (error) {

        res.status("401").json({
            status:'error',
            message:'Unable to authenticate users, '+error,
            request:req.headers,
        })
    }
})

module.exports = router;
