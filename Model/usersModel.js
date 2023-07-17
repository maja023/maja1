const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    id:{
        type:String,
        require:true,
        
    },
    name:{
        type:String,
        require:true
    },
   
    phone:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    avatar:{
        type:String,
        require:true,
        default:"avatar.jpg"
    },
    password:{
        type:String,
        require:true,
      
    },
    amount:{
        type:String,
        default:1000, 
       
    },
    status:{
        type:String,
        default:"pending"
    },
    createdOn:{
        type:Date,
        default:Date.now
    }
})


module.exports=mongoose.model("majaTable",userSchema);