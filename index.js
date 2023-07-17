require("dotenv");
const bodyParser=require("body-parser");
 const address=require('address');


const configF=require("./config/config");
const express=require("express");
const app=express();
app.use(express.static("Views"));
require('./config/db');
const PORT=configF.app.PORT;
app.use(bodyParser.urlencoded({ extended: true }))
const cookieParser=require('cookie-parser');
app.use(cookieParser())
const userRoutres=require("./Routes/userdRoute");
app.use(userRoutres);
const studentRoutes=require("./Routes/studentRoutes");
app.use(studentRoutes);
app.set('view engine', 'ejs');
app.use(express.static('views/html'))




app.use((req,res)=>{
    res.send("invalid url");
})

app.listen(PORT,()=>{
    console.log(`the server is running ${PORT}`);
});


