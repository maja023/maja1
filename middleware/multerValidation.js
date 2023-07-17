const multer=require("multer");
const path=require("path");
const upload_file='./upload';

const stroge=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(true,upload_file);
    },
    filename:(req,file,cb)=>{

    }
});


const upload=multer({
    storage:stroge,
    

});


module.exports=upload;
