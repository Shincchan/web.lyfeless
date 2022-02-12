const Post=require('../models/post');
const User=require('../models/user');
try{
    module.exports.home= async function(req,res){
        //    Post.find({},function(err,posts){
        //     return  res.render('home',{
        //         title:"home",
        //         posts:posts
        //     });
        //    });
        let posts= await Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
        
        let users = await User.find({});
        
        return  res.render('home',{
                    title:"home",
                    posts:posts,
                    all_users:users
                });
            
        }
}
catch{
    console.log("error",err);
    return ;
}





    

//using then,promises
//let posts=Post.find({}).populate('User').exec(....);
//posts.then()