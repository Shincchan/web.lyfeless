
const { redirect } = require('express/lib/response');
const Comment=require('../models/comment');
const Post = require('../models/post');

module.exports.create=function(req,res){
     Post.findById(req.body.post,function(err,post){
         if(err){
            console.log("error h bhai");
            return;
         }
         else{
             Comment.create({
                 content:req.body.content,
                 post:req.body.post,
                 user:req.user._id
             },function(err,comment){
                 if(err){
                     console.log(err);
                     return;
                 }
                 else{
                    
                    post.comments.push(comment);
                    post.save();
                   res.redirect('/');
                 }
             })
         }
     })
}
module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment){
           
           if((comment.user==req.user.id)||(req.user.id==req.params.id2)){
            let  postId=comment.post;
                comment.remove();
                Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                    if(err){
                        console.log(err);
                        return; 
                    }
                    
                    return res.redirect('back');
                }
                )
           }else{
               return res.redirect('/users/sign-in/');
           }
        }
        else{
            return res.redirect('back');
        }
    })
}