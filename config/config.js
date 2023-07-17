require("dotenv").config();

const dev={
    app:{
        PORT:process.env.PORT
    },
    db:{
        url:process.env.DB_URL

    }
}

module.exports=dev;