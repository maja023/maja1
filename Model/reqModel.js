const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    requestid:{
        type:String,
        require:true
    },
    requesternumber:{
        type:String,
        require:true
    },
   
    requestednumber:{
        type:String, 
        require:true
    },
    requestbody:{
        type:String,
        require:true
    },
    requestedamount:{
        type:Number,
        require:true
    },
    requeststutas:{
        type:String,
        require:true,
    },
    transationDate:{
        
        type:String,
      
    }
})


module.exports=mongoose.model("requestmoney",userSchema);