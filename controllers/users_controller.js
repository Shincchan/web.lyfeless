const User=require('../models/user');
const Post=require('../models/post');
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render("users",{
            title:"profile",
            profile_user:user
        });
    })
   
}
module.exports.signUp=function(req,res){
   if(req.isAuthenticated()){
       res.redirect('/users/profile');
   }
    return res.render("users_sign_up",{
        title:"sign_up"
    });
};
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
      return  res.redirect('/users/profile');
    }
    return res.render("users_sign_in",{
        title:"sign_in"
    });
};
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error has occured'); return ;}
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('error has occured'); return ;}
                console.log(user);
                return res.redirect('/users/sign-in')
            })
        }
        else{
            return res.redirect('back');
        }
    })

}
module.exports.createSession=function(req,res){
    return res.redirect('/');
}
module.exports.destroySession=function(req,res){
    req.logout();
    return res.redirect('/');
}
