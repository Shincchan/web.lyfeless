const express=require('express');
const cookieParser=require('cookie-parser');

const port=8000;
const app=express(); 
const db=require('./config/mongoose'); 
app.use(express.urlencoded());
app.use(cookieParser());  
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
    console.log(`error:${err}`);
    return ;
    }
    else{
        console.log(`server running on port:${port}`);
    }
}); 