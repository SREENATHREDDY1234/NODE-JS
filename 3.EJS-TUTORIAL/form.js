const express = require('express');
const path = require('path');
const app = express();

//set the view engine as ejs
app.set('view engine','ejs');

//set the directory for the views
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    res.render('form');
})

app.use(express.urlencoded({ extended: true }));

app.post('/submit',(req,res)=>{
    console.log(req.body);
    res.send(`Hello ${req.body.username}, you password is ${req.body.password}`);
})
app.listen(3000,()=>{
    console.log("server is running in http://localhost:3000/")
})