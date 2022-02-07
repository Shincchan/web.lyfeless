const express=require('express');
const router=express.Router();
const postsController=require('../controllers/post-controller')
router.post('/create',postsController.create);
module.exports=router;