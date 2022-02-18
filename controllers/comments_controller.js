const Comment=require('../models/comment');
const Post = require('../models/post');
try{
    module.exports.create= async function(req,res){
        let post=await Post.findById(req.body.post);
             
             let comment= await   Comment.create({
                     content:req.body.content,
                     post:req.body.post,
                     user:req.user._id
                                                 });
           
                if(req.xhr){
                    post.comments.push(comment);
                    post.save();        
                    let comment1= await Comment.findOne({_id:comment._id}).populate('post').populate('user','name');
                    return res.status(200).json({
                             data:{
                                 comment:comment1,
                                 post_id:req.body.post
                             },
                             message: "comment has been created"

    
                            })
                        }
                    post.comments.push(comment);
                    post.save();
                    res.redirect('/');
                     }
}
catch{
    console.log("error h bhai");
            return; 
}
try{
module.exports.destroy= async function(req,res){
    
    let comment=await Comment.findById(req.params.id);

           if((comment.user==req.user.id)||(req.user.id==req.params.id2)){

            let  postId=comment.post;
                comment.remove();
                let post=await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
                    if(req.xhr){
                        console.log('hii');
                        return res.status(200).json({
                            data:{
                                comment:comment
                            },
                            message:"comment deleted"
                        })
                    }
                    
                    return res.redirect('back');
                
                
           
                }}}
           
           catch{
            console.log('not correct');   
            return res.redirect('/users/sign-in/');
           }       
