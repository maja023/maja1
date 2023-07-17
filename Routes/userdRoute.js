const routes=require("express").Router();

const {getSignup, postsignup,
    getallUsersdata,getOneuserdata,
    getLogin,postLogin,getProfile,
    getDltuser,getEditUser,
    postEditUser,getStudent,postStudentD,confirmController,restricController,postSendMoney,
    gettransation,getSendmoney,getMoneyreq,postreqmoney,getrequest,getrequestid } = require("../Controllers/usersController");

 const {addSresult}=require('../Controllers/studentController');

routes.get("/",(req,res)=>{
    res.render("html/index");
})
   
    
routes.get("/signup",getSignup);
routes.post("/signup",postsignup);
routes.get("/login",getLogin);
routes.post("/login",postLogin);
routes.get("/logout",(req,res)=>{
    res.clearCookie("user").redirect('/login');
    
})
routes.get("/profile",getProfile)
routes.get("/users",getallUsersdata);
routes.get("/user/:id",getOneuserdata);
routes.get("/delete/:id",getDltuser);
routes.get("/edit/:id",getEditUser);
routes.post("/edit",postEditUser);
routes.get('/confirm/:phone',confirmController);

routes.get('/restric/:phone',restricController);

routes.get('/sendmoney',getSendmoney);
routes.post('/sendmoney',postSendMoney);

routes.get("/moneyreq",getMoneyreq);
 
routes.get('/transation',gettransation);
routes.post('/reqmoney',postreqmoney);

routes.get('/request',getrequest);
routes.get('/moneyreq/:id',getrequestid);


module.exports=routes;