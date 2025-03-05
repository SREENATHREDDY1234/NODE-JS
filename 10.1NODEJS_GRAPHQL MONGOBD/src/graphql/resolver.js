
const Product = require("../models/product");

const resolvers = {
    Query : {
        products:async()=>await Product.find(),
        product:async(_,{id})=>await Product.findById(id),
    },
    Mutation : {
        createProduct : async(_,{title,category,price,inStock})=>{
            const newlyCreatedProduct = {
                title,
                category,
                price,
                inStock
            };
            await Product.create(newlyCreatedProduct);
            
            return newlyCreatedProduct;
        },
        deleteProduct : async(_,{id})=>{
            const deletedProduct = await Product.findByIdAndDelete(id);
            if(!deletedProduct)return null;

            return deletedProduct;
        },
        updateProduct : async(_,{id,...updates})=>{
            const updatedProduct = await Product.findByIdAndUpdate(id,updates,{new:true});
            if(!updatedProduct) return null;

            return updatedProduct;
        }
    }
};

module.exports = resolvers;