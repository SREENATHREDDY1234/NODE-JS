require('dotenv').config();
const mongoose = require('mongoose');
const connectToDB = async()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("database connected successfully");
    }catch(e){
        console.log("DB connection failed ",e);
        process.exit(1);
    }
}

module.exports = connectToDB;