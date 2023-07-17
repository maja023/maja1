const sRoutes=require('express').Router();

const {postStudentD,getStudent,addSresult,seeResult,seePostResult,download}=require('../Controllers/studentController');


sRoutes.get('/addresult',(req,res)=>{
  res.render('students/addStudentResult');
})


//this is student routes
sRoutes.post("/addresult",postStudentD);
sRoutes.get("/student",getStudent);
sRoutes.post("/addSresult",addSresult);
sRoutes.get("/seeResult",seeResult);
sRoutes.post("/seeResult",seePostResult);
sRoutes.get("/download",download);


 


module.exports=sRoutes;