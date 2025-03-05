const mongoose = require('mongoose');

const connectTODB = async()=>{
    try{
        await mongoose.connect("mongodb+srv://sreenathreddy0404:sreen7201@book-details.tpidj.mongodb.net/");
        console.log("mongo db connection is successful");
        
    }catch(e){
        console.error('Mongodb connection failed',e);
        process.exit(1);
    }
}

module.exports = connectTODB;