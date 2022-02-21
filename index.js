const express=require('express');
const cookieParser=require('cookie-parser');
const app=express(); 
const port=8000;
const expresLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const session =require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const expressLayouts = require('express-ejs-layouts');
const mongoStore=require('connect-mongodb-session')(session);
const sasssMiddleware=require('node-sass-middleware');
const flash =require('connect-flash');
const customMware=require('./config/middleware');
app.use(sasssMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:'true',
    outputStyle:"expanded",
    prefix:'/css'
}))


app.use(express.urlencoded());
app.use(cookieParser());  
app.use(express.static('./assets'));
//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
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
app.use(flash());
app.use(customMware.setFlash);
app.use('/',require('./routes'));
// app.use('/users',require('./routes/users'));
app.listen(port,function(err){
    if(err){
    console.log(`error:${err}`);
    return ;
    }
    else{
        console.log(`server running on port:${port}`);
    }
});