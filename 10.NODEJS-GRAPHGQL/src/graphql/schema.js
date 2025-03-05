//this file will tell that what will be the sstructure of your data

const {gql} = require('graphql-tag');
//String
//Int
//Float
//Boolean
//Id -> an unique identifier

//->blog->fetch all the blogs, fetch blog by id,

const typeDefs = gql`
type Product{
    id: ID!
    title: String!
    category: String!
    price: Float!
    inStock: Boolean!
}

type Query{
    products: [Product!]!
    product(id:ID!):Product
}

type Mutation{
    createProduct(
        title:String!
        category:String!
        price:Float!
        inStock:Boolean!
    ):Product
    deleteProduct(
        id:ID!
    ):Boolean
    updateProduct(
        id:ID!
        title:String
        category:String
        price:Float
        inStock:Boolean
    ):Product
}
`;

module.exports = typeDefs;