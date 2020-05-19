
const express = require('express');
const graphqlHTTP = require('express-graphql');
const {GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString, graphql,} = require('graphql');
const app = express();
const bodyParser = require('body-parser');
// const Mongoose = require('mongoose');

// Mongoose.connect("mongodb://localhost:27017/user");

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/user";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  
});
const users=[
	{id:1,name:"master",age:27},
	{id:2,name:"rahul",age:24},
	{id:3,name:"rajesh",age:25},
	{id:4,name:"kavita",age:28},
];

const UserType = new GraphQLObjectType({
	name:'Users',
	description:'.....',
	fields:{
		id:{
			type:GraphQLInt
		},
		name:{
			type:GraphQLString
		},
		age:{
			type:GraphQLString
		}
	}
});
const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
	    name:"Query",
		description:"hello this is schema",//this is optional
		fields:()=>({//used to define query as name users or user
			users:{
				type: new GraphQLList(UserType),
				resolve: (parent,orgs)=>{
					return users;//we can write query here related to db
				}
			},
			user:{
				type: UserType,
				args:{
					id:{
						type:GraphQLInt,
					}
				},
				resolve: (parent,{ id })=>{
					const user = users.filter(user=>user.id == id);
					return user[0];
				}
			}
		}),
	})
});

app.use("/graphql",graphqlHTTP(
       {
       	schema,
       	graphiql:true,
       }
	),);

app.get('/',(req,res)=>{
	const query = `query {users{id,name,age}}`;
	graphql(schema, "{users{id,name,age}}",query).then(response=>res.send(response)).catch(err=>res.send(err));
});

app.get('/:id',(req,res)=>{
	const query = `query {user(id: ${req.params.id}){id,name,age}}`;
	graphql(schema,query).then(response=>res.send(response)).catch(err=>res.send(err));
});

app.listen('4000',()=>{ 
	console.log('this server is listening port 4000');
});