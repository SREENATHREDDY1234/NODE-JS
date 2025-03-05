import mongoose from "mongoose";
import "dotenv/config"

const connectToDB = async ()=>{
   
    await mongoose.connect(`${process.env.MONGODB_URL}/MusicFreakAuth`)
    .then(()=>console.log("Database connection successful"))
    .catch((e)=>console.log("database connection failed.",e))
}

export default connectToDB;