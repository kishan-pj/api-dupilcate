const usermodel = require("../models/usermodel");
const bcryptjs = require("bcryptjs");
const config =require('../config/secret');
const jwt = require('jsonwebtoken');

const create_token =async(id)=>{
    try {
        
        const token =await jwt.sign({_id:id},config.secret_jwt)
        return token;

    } catch (error) {
        res.status(400).send(error.message)
    }
}

// registration////

// for password security
const securepassword = async (password) => {
  try {
    const passwordHash = await bcryptjs.hash(password, 10);
    return passwordHash;
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const register_user = async (req, res) => {
  try {
    // to make password secure
    const spassword = await securepassword(req.body.password);

    const user = new usermodel({
      fullname: req.body.fullname,
      image: req.file.filename,
      email: req.body.email,
      username: req.body.username,
      password: spassword,
    });

    const userData = await usermodel.findOne({ email: req.body.email });
    if (userData) {
      res
        .status(200)
        .send({ success: false, msg: "this email is already exists" });
    } else {
      const user_data = await user.save();
      res.status(200).send({ success: true, data: user_data });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//login 

const user_login = async(req,res)=>{
    try {

        const username =req.body.username;
        const password =req.body.password;
        
        const userData = await usermodel.findOne({username:username}); 
        if(userData){
            const passwordMatch = await bcryptjs.compare(password,userData.password);
            if(passwordMatch){
                const tokenData =await create_token(userData._id);
                    const userResult ={
                        _id:userData._id,
                        fullname:userData.fullname,
                        email:userData.email,
                        image:userData.image,
                        username:userData.username,
                        password:userData.password,
                        type:userData.type,
                        token:tokenData
                    }
                    const response = {
                        success:true,
                        msg:"User Details",
                        data:userResult
                    }
                    res.status(200).send(response)
            }
            else{
                res.status(200).send({sucess:false,msg:"Login details are incorrect"})

            }
        }
        else{
            res.status(200).send({sucess:false,msg:"Login details are incorrect"})
        }
    } catch (error) {
        res.status(400).send(error.message);
    }

}

module.exports = {
  register_user,
  user_login
};
