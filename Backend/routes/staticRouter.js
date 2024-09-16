const express = require('express');
const Router = express.Router();
const {handleLoginUser,handleSignUpUser} = require('../controllers/user')
const {urlModel}= require('../model/url')


Router.get('/api/home',async (req,res)=>{
    console.log(req.user._id);
    
    try{

        
        allurls = await urlModel.find({createdBy:req.user._id});
        return res.send({allurls,domain:process.env.url,status:true});
    
    }catch(err){
        console.log(err);
        res.send({status:false})
        
    }
})

module.exports=Router
