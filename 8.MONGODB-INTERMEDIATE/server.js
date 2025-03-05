require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const  productRouter  = require("./routes/product-routes");
const bookRouter = require('./routes/book-routes');


const app = express();

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{console.log("database connection successful.")})
.catch((e)=>console.log("database connection error",e));

//use middleware
app.use(express.json());
app.use('/products',productRouter);
app.use('/reference',bookRouter);

app.listen(process.env.PORT,()=>{console.log("server is running in port",process.env.PORT)});