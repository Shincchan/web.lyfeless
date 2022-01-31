const express=require('express');
const port=8000;
const app=express(); 
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