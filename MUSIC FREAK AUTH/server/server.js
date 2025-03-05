import express from "express"
import cors from "cors"
import "dotenv/config"
import cookieParser from "cookie-parser"

import connectToDB from "./config/mongodb.js"
import authRouter from "./routes/authRoutes.js"

const app = express();
const port = process.env.PORT || 4000

connectToDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true}))

app.get('/',(req,res)=>{res.send("API Working fine");})
app.use('/api/auth',authRouter);

app.listen(port,()=>{
    console.log(`Server is running in port ${port}`);
})