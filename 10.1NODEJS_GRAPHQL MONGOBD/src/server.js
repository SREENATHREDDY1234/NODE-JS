const {ApolloServer} = require('@apollo/server');
const {startStandaloneServer} = require('@apollo/server/standalone');
const typeDefs = require("./graphql/schema");
const resolvers = require('./graphql/resolver');
const connectToDB= require("./database/db");

connectToDB();

async function startServer(){
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    const {url} = await startStandaloneServer(server,{
        listen:{port:4000}
    });

    console.log(`server is ready at ${url}`);
}
startServer();
