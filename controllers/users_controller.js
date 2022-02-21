const User=require('../models/user'); 
const fs=require('fs');
const path =require('path');

module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render("users",{
            title:"profile",
            profile_user:user
        });
    })
   
}
module.exports.update= async function(req,res){
    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,{name:req.body.name,email:req.body.email},function(err,user){
    //         return res.redirect('back');
    //     })
    // }
    // else{
    //     return res.status(401).send('unauthorized');
    // }
    if(req.user.id==req.params.id){
        try{
            let user= await User.findById(req.params.id);
          
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log("***multerError:",err);
                     return;
                }
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                   if(user.avatar){
                       fs.unlinkSync(path.join(__dirname,'..', user.avatar));
                   }
                   
                    user.avatar=User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');

            })

        }catch(err){
            req.flash('error',err);
            return res.redirect('back');

        }

    }else{
        req.flash('error','unauthorized'); 
        return res.status(401).send('unauthorized');
    }

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
    req.flash('success','Logged in Successfully');
    
    return res.redirect('/');
}
module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','Logged out Successfully');
    return res.redirect('/');
}
