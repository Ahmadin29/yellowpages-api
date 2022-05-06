const express = require('express');
const router = express.Router();
// const authentication = require('./middleware/authentication');

const userRoute = require('./controllers/users');

router.get('/',async (req,res)=>{
    res.send('API worked well')
})

router.use('/user',userRoute);

module.exports = router;