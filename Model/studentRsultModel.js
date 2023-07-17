const mongoose=require("mongoose");

const studentResultAdd=mongoose.Schema({
    studentId:{
        require:true,
        type:Number,
    },
    name:{
        require:true,
        type:String,
    },

    password:{
        require:true,
        type:String,
    },
    phone:{
        require:true,
        type:Number,
    },
    address:{
        require:true,
        type:String,
    },
    bangla:{
        require:true,
        type:Number,
    },
    english:{
        require:true,
        type:Number,
    },
    ict:{
        require:true,
        type:Number,
    },
    resultStatus:{
        require:true,
        type:String,
    },
    addDate:{
        default:Date.now,
        type:Date,
    },
});


module.exports=mongoose.model("studentResult",studentResultAdd);


