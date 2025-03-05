const express = require('express');
const dotenv = require('dotenv');
const connectTODB = require('./database/db');
const artistRouter = require('./routes/artists-routes');
const authRouter = require('./routes/auth_routes');


dotenv.config();
const app = express();

//middleware
app.use(express.json());

//database
connectTODB();

//routes
app.get('/',(req,res)=>{
    res.send("hello world");
})

app.use('/api/artist',artistRouter);
app.use('/api/auth',authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("server is runnin in port",PORT);
})