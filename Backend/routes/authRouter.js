const express = require('express');
const { handleSignUpUser,handleLoginUser,handleLoginSetPass,handleLoginVerify } = require('../controllers/user');
const Router = express.Router();

Router.post('/api/auth/signup',handleSignUpUser)
Router.post('/api/auth/login',handleLoginUser)
Router.post('/api/auth/login/setpass',handleLoginSetPass)
Router.post('/api/auth/login/verify',handleLoginVerify)



module.exports=Router