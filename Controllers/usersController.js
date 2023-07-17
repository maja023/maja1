const path=require("path");
const {v4:uuidv4}=require('uuid');
const address=require('address');


///all model here
const newUser2=require("../Model/usersModel");
const transationModel=require('../Model/transationModel');
const { findOne } = require("../Model/usersModel");
const usersModel = require("../Model/usersModel");
const reqModel=require('../Model/reqModel');


const a=[]
for (let index = 1000; index<1100; index++) {
    a.push(index)
    
}





const getSignup=(req,res)=>{
    const crUser=req.cookies.user;
    if(crUser){
res.redirect("/profile");
    }else{
        res.render("html/signup");
    }
   
} 

const postsignup=async(req,res)=>{

    const phone=req.body.sPhone;
    try{
       
        const phoneData=await newUser2.findOne({ phone:phone});
        if( !phoneData){

            const NewUser1=new newUser2({
                id:a[0]++, 
                name:req.body.sName,
                phone:req.body.sPhone,
                address:req.body.sAddress,
                password:req.body.sPassword
            })
            await NewUser1.save();
         res.status(201).redirect("/login");
           

        }

    
        
        else{
            res.send("Phone Number have already exit");
    
        }
     
    }catch(error){
        res.send("data not submited");
    
    }
      
  
   
} 
 
const getallUsersdata=async(req,res)=>{
    const cruser=req.cookies.user;
try {
if(cruser){
 const users=await newUser2.find(); 
    res.render('html/users',{
        users:users,
        currentuser:cruser
   
    })

}else{
res.send("login first")
}

   
   
 
    
 } catch (err) {
    res.json(
        "data not found")
 }










   
 
  
}
const getOneuserdata=async(req,res)=>{
    const oneUser1=await newUser2.findOne({id:req.params.id});
    res.json(oneUser1);

} 

const getLogin=(req,res)=>{
    const crUser=req.cookies.user;
    const ipaddress=address.ip();
  
    if(!crUser){

        res.render("html/login",{
            ip:ipaddress
        });
}else{
    res.redirect('/profile');
}
}


const postLogin=async(req,res)=>{
    const {lPhone,lPassword}=req.body;
    const USer=await newUser2.findOne({phone:lPhone});
    if(USer && USer.password===lPassword ){
        if(USer.status==="confirm"){
            const userAlldata=USer;
            const cphone=USer.phone;
            res.cookie("user",lPhone);
            res.status(202).redirect('/profile');
        }else{
            res.render("html/login",{
                statusError:"Pending Your Account  !"
            })
        }
    }else{
        res.render("html/login",{
            incorrectError:"Incorrect phone Or Password   !"
        })
    }
}


const getProfile=async(req,res)=>{
    const cruser=req.cookies.user;
    if(cruser){
        const cruserData=await newUser2.findOne({phone:cruser});
        const findTrxuser=await transationModel.find({transationId:cruser});
        if(cruserData){
            res.render("profile",{
                title:cruserData,
                send:findTrxuser
            })
        }
    }else{
        res.redirect('/login');
    }
}

const getDltuser=async(req,res)=>{
 
try {
    
    const getDltid=req.params.id;
    const dltuserFind=await usersModel.findOne({id:getDltid});
    if(dltuserFind){

    const dltQ=await usersModel.deleteOne({id:getDltid});
    if(dltQ){
res.redirect("/users");
    }else{
        res.send("delete not successfull");
    }

    }else{
        res.send("no user found");
    }


} catch (error) {
    
}

}


const getEditUser=async(req,res)=>{
   const editId=req.params.id;
   const scId=await newUser2.findOne({id:editId});


    res.render('html/edit',{
        user:scId
    }) 

}

const postEditUser=async(req,res)=>{
const name=req.body.uname;
const id=req.body.uId;
const email=req.body.uemail;
const address=req.body.uaddress;
const password=req.body.upassword;

const upUerData=await newUser2.findOne({id:id});

upUerData.name=name;
upUerData.address=address;
upUerData.password=password;


const upD=upUerData.save();

    res.status(204).redirect('/users');
}


const confirmController=async(req,res)=>{
    const confirmUserphone=req.params.phone;
    const matchCuser=await newUser2.findOne({phone:confirmUserphone});
    if(matchCuser){
        matchCuser.status="confirm";
        await matchCuser.save();
        res.redirect('/users');
       
        }else{
            res.send("data not found this user!")
        }

}
const restricController=async(req,res)=>{
    const confirmUserphone=req.params.phone;
    const matchCuser=await newUser2.findOne({phone:confirmUserphone});
    if(matchCuser){
        matchCuser.status="pending";
        await matchCuser.save();
        res.clearCookie('user');
        res.redirect('/users');
       
        }else{
       res.send("data not found this user!")
    }
}



const getSendmoney=async(req,res)=>{
    const cruser=req.cookies.user;
    if(cruser){
        const crUsrbalancequery=await newUser2.findOne({phone:cruser});
        const cruserbalance=crUsrbalancequery.amount;
        const senderNumber=req.cookies.user;
        res.render('html/sendmoney',{
            balance:cruserbalance,
            snumber:senderNumber
        });
    }else{
        res.redirect("/login");
    }

}



const postSendMoney=async(req,res)=>{

    
try {
    const senderPhone=req.cookies.user;
const reciverPhone=req.body.rPhone;
const reciveAmount=parseInt(req.body.sAmount);
const reciverAcount=await newUser2.findOne({phone:reciverPhone});
if(reciverAcount){
    const conAmount=parseInt(reciverAcount.amount);
    const allAmount=conAmount+reciveAmount;
    reciverAcount.amount=allAmount;
    const reciveSave=reciverAcount.save();
    
if(reciveSave){
    const dat=new Date();
    
    const trreciveQuery=new transationModel({
        transationId:reciverPhone,
        reciverNumber:reciverPhone,
        senderNumber:senderPhone,
        transationAmount:reciveAmount,
        transationStatus:"recive money",
        transationDate:dat.toLocaleTimeString()+" - "+dat.toLocaleDateString()
    });

    await trreciveQuery.save();
 
}else{
    console.log("recive money problem") 
}
}else{
    res.send("number is valid")
}



//send money program
const sendamm=parseInt(req.body.sAmount);
const senderAccount=await newUser2.findOne({phone:senderPhone});
if(senderAccount){
    const conAm=parseInt(senderAccount.amount);
    const allAm=conAm-sendamm;
    senderAccount.amount=allAm;
    const sendSave=senderAccount.save();
    if(sendSave){ 
        const dat=new Date();
    
        const trsendQuery=new transationModel({
            transationId:senderPhone,
            senderNumber:senderPhone,
            reciverNumber:reciverPhone,
            transationAmount:reciveAmount,
            transationStatus:"send money",
            transationDate:dat.toLocaleTimeString()+" - "+dat.toLocaleDateString()
        });
        await trsendQuery.save();
    
    }else{
        console.log("send money problem")
    }
    
    res.redirect('/sendmoney');
    
}else{
    res.send("money transfer problem")
}
    
} catch (error) {
    console.log(error)
    
} 
}


const gettransation=async(req,res)=>{ 
    const findTrxuser=await transationModel.find();
res.render('html/transationHistory',{
    send:findTrxuser
});
}
const getMoneyreq=async(req,res)=>{
    const currUser=req.cookies.user;
    const finUser=await newUser2.findOne({phone:currUser});
    const crUsernUmber=finUser.phone;
res.render('html/reqmoney',{
reqPhone:crUsernUmber
});
}

const postreqmoney=async(req,res)=>{
    const bdata=req.body;
const reqQuery= new reqModel({
    requestid:req.body.requesternumber,
    requesternumber:req.body.requesternumber,
    requestednumber:req.body.requestednumber,
    requestbody:req.body.rebody,
    requestedamount:req.body.requestedamount,
    requeststutas:"pending"

});

await reqQuery.save();
res.redirect('/profile');
}

const getrequest=async(req,res)=>{
    const crruser=req.cookies.user;
    const findreq=await reqModel.find({$or:[{requesternumber:crruser},{requestednumber:crruser}]});



    if(findreq ){
        const mkstautas=findreq.requestid;
   
        res.render('html/requestm',{
            reqData:findreq,
            status:crruser
          });
    }else{
        res.send("no money request");
    }
}

const getrequestid=async(req,res)=>{
  const reqId=req.params.id;
  const reqIddata=await reqModel.findOne({requestid:reqId});

if(reqIddata){
    res.render("html/sendmoney2",{
        data:reqIddata
    });
}else{
    res.send("empty")
}

}



module.exports={getSignup,postsignup,
    getallUsersdata,getOneuserdata,getLogin,
    postLogin,getProfile,getDltuser,getEditUser,postEditUser,
    confirmController,restricController,postSendMoney,
    gettransation,getSendmoney,getMoneyreq,postreqmoney,getrequest,getrequestid};