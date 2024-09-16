const mongoose = require('mongoose');


const urlData = new mongoose.Schema({
     shortId:{
        type:String,
        required:true,
        unique:true
     },
     redirectURL:{
        type:String,
        required:true,
     },
     visitHistory:[{timestamp:{type: Number}}],
     createdBy : {
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"
     }
})


const urlModel = mongoose.model('url' , urlData);


module.exports={urlModel}