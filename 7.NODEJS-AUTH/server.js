require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db');
const authRoutes = require('./routes/auth-routes');
const homeRoutes = require('./routes/home-routes');
const adminRoutes = require('./routes/admin_routes');
const uploadImageRoutes = require('./routes/image-routes');

//database connection
connectToDB();

const app = express();
const PORT = process.env.POR || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.send("hello world");
})
//routes
app.use('/api/auth',authRoutes);
app.use('/api/home',homeRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/image',uploadImageRoutes);


app.listen(PORT,()=>{
    console.log("server is running in port",PORT);
})
