//basic requirements
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 1000;
const cookieParser=require('cookie-parser')
const authRouter =require('./routes/authRouter')
const staticRouter=require('./routes/staticRouter')
const {restrictToLoggedIn}= require('./middleware/restrictToLoggedIn')
const bodyParser = require('body-parser')
const url =  require('./routes/url')
app.use(cors({
    origin: process.env.frontendUrl, // The URL of your Netlify frontend
    credentials: true,               // This allows cookies to be sent across origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Add necessary headers
}));
app.use(cookieParser())
app.use(bodyParser.urlencoded({extends:false}));
app.use(express.json());
//anyone can send a request to the server here you can restrict also
//connection of mongoose---------------------------------------------------------
mongoose.connect(process.env.Mongo_url).then(()=>{

    // Define routes one by one with their handlers
    app.post('/api/auth/login', authRouter);
    app.post('/api/auth/signup', authRouter);
    app.post('/api/auth/login/setpass', authRouter);
    app.post('/api/auth/login/verify', authRouter);
    
    app.get('/api/home', restrictToLoggedIn, staticRouter);
    app.post('/api/url', restrictToLoggedIn, url);
    app.get('/api/:shortid', url);

    // Logout route explicitly defined here
    app.post('/api/logout', (req, res) => {
        res.clearCookie('uid', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(200).json({ message: 'Logged out successfully' });
    });

}).catch((err)=>{
    console.log("Mongodb connection failed", err);
});


// server is listen mode 
app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`Server is started in Port number ${PORT}`);
    }
    
});








