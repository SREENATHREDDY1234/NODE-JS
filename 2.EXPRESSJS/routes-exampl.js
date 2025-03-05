const express = require('express');

const app = express();

app.get("/",(req,res)=>{
    res.send("Welcome to Home Page");
})

app.get("/products",(req,res)=>{
    const products = [
        {
            id : 1,
            label : "product 1"
        },
        {
            id : 2,
            label : "product 2"
        },
        {
            id : 3,
            label : "product 3"
        }
    ]

    res.json(products);
});

app.get('/products/:productId',(req,res)=>{
    const productId = parseInt(req.params.productId);
    const products = [
        {
            id : 1,
            label : "product 1"
        },
        {
            id : 2,
            label : "product 2"
        },
        {
            id : 3,
            label : "product 3"
        }
    ]

    const getSingleProduct = products.find((product)=>productId === product.id);
    if(getSingleProduct){
        res.json(getSingleProduct);
    }else{
        res.status(404).send("product is not found");
    }
    
})

app.listen(3000,()=>{
    console.log("Server is running in http://localhost:3000");
})