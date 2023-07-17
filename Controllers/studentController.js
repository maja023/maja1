const path=require("path");
const {v4:uuidv4}=require('uuid');
const newUser2=require('../Model/usersModel');

const studenresultDatamodel=require("../Model/studentRsultModel");
const { findOne } = require("../Model/usersModel");


const addSresult=async(req,res)=>{
    const srStatus="uploded";
    const studentIdmatch=await studenresultDatamodel.findOne({studentId:req.body.sId });
 
if(!studentIdmatch  ) {
    const dataUpstudent=new studenresultDatamodel({
        studentId:req.body.sId,
         name:req.body.sName,
         email:req.body.sEmail,
         phone:req.body.sPhone,
         password:req.body.sPassword,
         address:req.body.sAddress,
         bangla:req.body.sBangla,
         english:req.body.sEnglish,
         ict:req.body.sIct,
         resultStatus:"uploded"
      });
             await dataUpstudent.save();
             if(dataUpstudent){
              res.status(205).redirect('/student');
             }else{
              res.send("student result data not submit")
             }



   
}else{

    res.render('students/addStudentResult',{
        already:"This Student Result Already Uploded Try Another Student..."
    });

}

}



const postStudentD=async(req,res)=>{
   try {
       const studentId=req.body.sId;
   const studentData=await newUser2.findOne({id:studentId});
   
   if(studentData){
   res.render('students/studentDetails',{
       studentDa:studentData
   });
    
   }else{
    res.render('students/addStudentResult',{
        notfound:"This Student Data Not Found Or Id Invalid..."
    });
   }
   } catch (error) {
       console.log(error);
   }
     
   }
   
   const getStudent=(req,res)=>{
      res.render('students/student',{});
  } 

   const seeResult=(req,res)=>{
      res.render('students/seeResultId',{});
  } 
   const seePostResult=async(req,res)=>{
    const studenRid=req.body.sId;
    const studentResultQuery=await studenresultDatamodel.findOne({studentId:studenRid});
    if(studentResultQuery){

 


        res.render('students/seeResult',{
            studentResult:studentResultQuery,
            title:studentResultQuery.name+" Result",
        })
    }else{
        res.render('students/seeResultId',{
            invalid:"Invaild User Id Number"
        });
    }
  
    
  } 

const download=(req,res)=>{
    res.download("./controllers/Result.pdf");
}


module.exports={addSresult,postStudentD,getStudent,seeResult,seePostResult,download};

