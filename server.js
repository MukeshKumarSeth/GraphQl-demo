
const express = require('express');
const graphqlHTTP = require('express-graphql');//this allow express to understand graphql


const app = express();
const bodyParser = require('body-parser');
const conn =  require('./config/connection.js');
const schema = require('./schema/schema.js');

const cors= require('cors');
//allow crose origin request
app.use(cors());
 app.use("/graphql",graphqlHTTP(
       {
       	schema,
       	graphiql:true,
       }
	));

app.listen('4000',()=>{ 
	console.log('this server is listening port 4000');
});