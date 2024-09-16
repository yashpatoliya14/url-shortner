const {userModel}= require('../model/user')
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator')

async function handleLoginUser(req,res) {
    try{
 
        const {email,password} = req.body;
        
        const user = await userModel.findOne({email});
        
        if(!user){
            return res.status(403).json({msg:"auth error",success:false})
         }
        
        const isEqual = await bcrypt.compare(password,user.password) 
        
        if(!isEqual){
            return res.status(403).json({msg:"auth error",success:false})
        }
        const payload = {
            _id: user._id,
            email: user.email
          }
        const jwtToken = jwt.sign(payload,process.env.secret,{expiresIn:'24h'});
        // res.cookie('uid',jwtToken,{
        //   httpOnly: true,       // Prevent access via JavaScript (important for security)
        //   secure: false,        // Set to true in production when using HTTPS
        //   sameSite: 'Lax',      // Prevent CSRF (choose 'Strict' for stricter rules)
        //   maxAge: 24 * 60 * 60 * 1000 // 1 day expiration
        // });
        return res.status(201).json({msg:"Login Successful",success:true,token:jwtToken})
 
     }catch(err){
         console.log(err);
         return res.status(500).json({msg:"Login Unsuccessful",success:false})
         
     }
 }
async function handleSignUpUser(req,res) {
   try{

       const {email,password,username} = req.body;
       console.log(password);
       
       const user = await userModel.findOne({email});
       
       if(user){
           return res.status(409).json({msg:"user already exists",success:false})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            email,
            password: hashedPassword,
            username
        });

        await newUser.save();

        return res.status(201).json({msg:"signup Successful",success:true})

    }catch(err){
        console.log(err);
        return res.status(500).json({msg:"signup Unsuccessful",success:false})
        
    }
}


const transporter = nodemailer.createTransport({
    service:'gmail',
    secure:true,
    port: 465,
    auth: {
      user: 'yashpatoliya05@gmail.com',
      pass: 'sytbqshcwudcfsat'
    },
  });

  async function handleLoginSetPass(req, res) {
    try {
      const { email } = req.body;
  
      // Validate email format (add validation logic here)
  
      const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
  
      const info = await transporter.sendMail({
        from: 'yashpatoliya05@gmail.com',
        to: email,
        subject: "OTP Verification ✔",
        text: `Your OTP code is: ${otp}`,
      });
  
  
      global.otpStore = { email, otp };

      return res.status(200).json({ msg: "Email sent successfully", success: true });
  
    } catch (err) {
      console.error('Error:', err);
      let errorMessage = "An error occurred.";
  
      if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        errorMessage = "Invalid or expired token.";
      } else if (err.name === 'NotAllowedError') {
        errorMessage = "Insufficient permissions.";
      } else if (err.name === 'ValidationError') {
        errorMessage = "Validation error in request data.";
      } // Add more specific error handling based on potential errors
  
      return res.status(500).json({ msg: errorMessage, success: false });
    }
  }

async function handleLoginVerify(req,res){
    const {otp} = req.body;

    
    
    if(!otp ){
      res.send({msg:"otp is not found !!!!",status:false})
    }

    if(otp==global.otpStore.otp){
      const payload = {
        email: global.otpStore.email
      }
      const jwtToken = jwt.sign(payload,process.env.secret,{expiresIn:'24h'});
      delete global.otpStore;
        res.status(200).send({msg:"otp is verified !",status:true,token:jwtToken});
    }else{
        res.send({msg:"Please Enter a valid otp to verify the email",status:false})
    }
}

module.exports={
    handleLoginUser,
    handleSignUpUser,
    handleLoginSetPass,
    handleLoginVerify
}