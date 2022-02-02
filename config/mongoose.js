const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/user_authentication');
const db=mongoose.connection;
db.once("open",function(){
    console.log("success");
})
