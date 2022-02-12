const Comment = require('../models/comment');
const Post=require('../models/post');
module.exports.create=function(req,res){
    Post.create({

        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
            console.log(err);
            req.flash('error','ivalid request');
            return ;
        }
        req.flash('success','post created');
        return res.redirect('back');
    })
}
module.exports.destroy=async function(req,res){
    let post=await Post.findById(req.params.id);
       
            if(post.user==req.user.id){
                post.remove();
               await Comment.deleteMany({post:req.params.id});
               req.flash('success','post and associated comments were deleted');
                 return res.redirect('back');
                
            }
        
        else{
            req.flash('error','ivalid req');
            res.redirect('back');
        }
    }