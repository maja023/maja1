const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    transationId:{
        type:String,
        require:true
    },
    senderNumber:{
        type:String,
        require:true
    },
   
    reciverNumber:{
        type:String,
        require:true
    },
    transationAmount:{
        type:Number,
        require:true
    },
    transationStatus:{
        type:String,
        require:true,
    },
    transationDate:{
        
        type:String,
      
    }
})


module.exports=mongoose.model("TransationTable",userSchema);