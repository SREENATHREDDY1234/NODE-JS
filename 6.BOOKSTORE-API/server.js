//we can use env varibile inside the .env file by default using below statement.
require('dotenv').config();
const express = require('express');
const connectTODB = require('./database/db.js');
const bookRoutes = require('./routes/book-routes.js')

const app = express();
const PORT = process.env.PORT || 3000;


//connect to our database.
connectTODB();

//middleware->express.json()
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('hello');
})

//routes here
app.use('/api/books',bookRoutes);

app.listen(PORT,()=>{
    console.log(`server is running in http://localhost/:${PORT}`);    
})