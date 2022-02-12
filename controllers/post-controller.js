const Comment = require('../models/comment');
const Post=require('../models/post');
module.exports.create=function(req,res){
    Post.create({

        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
            console.log(err);
            return ;
        }
        return res.redirect('back');
    })
}
module.exports.destroy=async function(req,res){
    let post=await Post.findById(req.params.id);
       
            if(post.user==req.user.id){
                post.remove();
               await Comment.deleteMany({post:req.params.id});
                 return res.redirect('back');
                
            }
        
        else{
            res.redirect('back');
        }
    }