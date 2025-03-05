require('dotenv').config();
const mongoose = require('mongoose');

const connectTODB = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log('database connected successfully');
    }catch(e){
        console.log("database connection failed");
        process.exit(1);
    }
}

module.exports = connectTODB;