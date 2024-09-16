const express = require('express');
const { URLGenerator,redirectUrl} = require('../controllers/url');
const Router = express.Router();

Router.post('/api/url', URLGenerator)
Router.get('/api/:shortId', redirectUrl)


module.exports=Router