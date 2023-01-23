const mongoose=require("mongoose");

const user = mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Admin','Customer'],
        default:'Customer'
    }
    
},{timestamps:true})

module.exports=mongoose.model('USer',user);
