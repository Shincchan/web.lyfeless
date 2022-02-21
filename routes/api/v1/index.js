const express=require('express');
const router=express.Router();



router.use('/posts',require('./potsts'));
module.exports=router; 