const mongoose = require('mongoose');


const userSignUpData = new mongoose.Schema({
     email:{
        type:String,
        required:true,
        unique:true
     },
     password:{
        type:String,
        required:true,
     },
     username:{
        type:String,
        required:true
     },
     role:{
      type:String,
      default:"student"
     }
})


const userModel = mongoose.model('users' , userSignUpData);


module.exports={userModel}