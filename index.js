const express=require('express');
const cookieParser=require('cookie-parser');
const app=express(); 
const port=8000;
const db=require('./config/mongoose');
const session =require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const mongoStore=require('connect-mongodb-session')(session);
app.use(express.urlencoded());
app.use(cookieParser());  

app.set('view engine','ejs');
app.set('views','./views');
app.use(session({
    name:'lyfe',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*10)
     },
    store:new mongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            if(err)
            console.log(err);
            return;
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));
app.use('/users',require('./routes/users'));
app.listen(port,function(err){
    if(err){
    console.log(`error:${err}`);
    return ;
    }
    else{
        console.log(`server running on port:${port}`);
    }
}); 