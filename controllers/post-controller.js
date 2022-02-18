const Comment = require('../models/comment');
const Post=require('../models/post');
try{
    module.exports.create= async function(req,res){
        let post= await Post.create({
              content:req.body.content,
             user:req.user._id
         });
         let post1= await Post.findOne({_id:post._id}).populate('user','name');
       
             if(req.xhr){
               
                
                 return res.status(200).json({
                     data:{
                         post:post1,
                         
                     },
                     message:"post created!" 
                 })
             }
             req.flash('success','post created');
             return res.redirect('back');
         }
}
catch{
    console.log("error",err);
    req.flash('error','ivalid operations');
    return ;
}


module.exports.destroy=async function(req,res){
    
    let post=await Post.findById(req.params.id);
      
            if(post.user==req.user.id){
                post.remove();
               await Comment.deleteMany({post:req.params.id});
              if(req.xhr){
                  return res.status(200).json({
                      data:{
                          post_id:req.params.id,
                      },
                      message:"post deleted"
                  })
              }
              
              
              
               req.flash('success','post and associated comments were deleted');
                 return res.redirect('back');
                
            }
        
        else{
            req.flash('error','ivalid req');
            return res.redirect('back');
        }
    }