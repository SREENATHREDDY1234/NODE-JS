const Product = require('../models/product');

const getProductStats = async(req,res)=>{
    try{
        const result =  await Product.aggregate([
            //stage 1:
            {
                $match : {
                    inStock : true,
                    price : {
                        $gte:100,
                    },
                },
            },
            //stage 2: group documents.
            {
                $group : {
                    _id : "$category",
                    avgPrice : {
                        $avg : "$price"
                    },
                    count : {
                        $sum : 1,
                    },
                },
            },
        ])
        res.status(200).json({
            success : true,
            data : result,
        })
    }catch(e){
        console.log("Error in get product stats : ",e);
        res.status(500).json({
            success : false,
            message : 'something error occured. Try again.'
        })
    }
}

const getProductAnalysis = async(req,res)=>{
    try{
        const result = await Product.aggregate([
            {
                $match : {
                    category:"Electronics",
                }
            },
            {
                $group : {
                    _id : null,
                    totalRevenue : {
                        $sum : "$price"
                    },
                    averagePrice : {
                        $avg : "$price"
                    },
                    maxProductPrice : {
                        $max : "$price"
                    },
                    minProductPrice : {
                        $min : "$price"
                    }
                }
            },
            {
                $project : {
                    _id : 0,
                    totalRevenue : 1,
                    averagePrice : 1,
                    maxProductPrice : 1,
                    minProductPrice : 1,
                    priceRange : {
                        $subtract : ["$maxProductPrice","$minProductPrice"],
                    }
                }
            }
        ])
        res.status(200).json({
            success : true,
            data : result,
        })

    }catch(e){
        console.log("Error in analysis of product : ",e);
        res.status(500).json({
            success : false,
            message : 'something error occured. Try again.'
        })
    }
}

const insertSampleProducts = async(req,res)=>{
    try{
        const sampleProducts = [
            {
                name : "Laptop",
                category:"Electronics",
                price : 50000,
                inStock:true,
                tags:["computer","tech"],
            },
            {
                name : "Smartphone",
                category:"Electronics",
                price : 18000,
                inStock:true,
                tags:["mobile","tech"],
            },
            {
                name : "Headphones",
                category:"Electronics",
                price : 5000,
                inStock:false,
                tags:["audio","tech"],
            },
            {
                name : "Running Shoes",
                category:"Sports",
                price : 999,
                inStock:true,
                tags:["footwear","shoes"],
            },
            {
                name : "Novel",
                category:"Books",
                price : 600,
                inStock:true,
                tags:["fiction","bestseller"],
            }, 
        ];

        const result = await Product.insertMany(sampleProducts);
        res.status(201).json({
            success:true,
            message : "Product inserted successfully",
            noOfProducts : sampleProducts.length
        })

    }catch(e){
        console.log("Error in insertion of product : ",e);
        res.status(500).json({
            success : false,
            message : 'something error occured. Try again.'
        })
    }
}

module.exports = {insertSampleProducts,getProductStats,getProductAnalysis};