const mongoose=require("mongoose");
const config=require("./config");


const DBURL=config.db.url;

mongoose.connect(DBURL)
.then(()=>{
    console.log("MOngo database conncted");
})

.catch((err)=>{
    console.log(err);
process.exit(1);
})