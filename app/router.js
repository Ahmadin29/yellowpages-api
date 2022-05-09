const express = require('express');
const router = express.Router();
const authentication = require('./middleware/authentication');

const userRoute             = require('./controllers/users');
const packagesRoute         = require('./controllers/packages');
const categoriesRoute       = require('./controllers/categories');
const subcategoriesRoute    = require('./controllers/sub_categories');

router.get('/',async (req,res)=>{
    res.send('API worked well')
})

router.use('/user',userRoute);
router.use('/packages',packagesRoute);
router.use('/categories',categoriesRoute);
router.use('/categories/:parent_id',(req,res,next)=>{

    req.parent_id = req.params.parent_id

    next()
},subcategoriesRoute);

module.exports = router;