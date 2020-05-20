
const express = require('express');
const graphqlHTTP = require('express-graphql');//this allow express to understand graphql
const {GraphQLSchema, 
	   GraphQLObjectType,
	   GraphQLList,
	   GraphQLInt, 
	   GraphQLString, 
	   graphql,} = require('graphql');
const app = express();
const bodyParser = require('body-parser');
const conn =  require('./config/connection.js');
const ItemModel = require('./model/books.js');
const schema = require('./schema/schema.js');







 app.use("/graphql",graphqlHTTP(
       {
       	schema,
       	graphiql:true,
       }
	));

app.listen('4000',()=>{ 
	console.log('this server is listening port 4000');
});