const express = require("express");

const user_routes = require('./routes/userRoute');
const app =express();

const mongoose=require("mongoose");
mongoose.set('strictQuery',false);
mongoose.connect('mongodb://127.0.0.1:27017/Practice')

app.use('/user',user_routes);


app.listen(4000,function(){
    console.log("server is ready")
})