
const express = require('express');
const graphqlHTTP = require('express-graphql');
const {GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString, graphql,} = require('graphql');
const app = express();
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');
Mongoose.connect("mongodb://localhost:27017/user",{useNewUrlParser:true});


// Mongoose.connect("mongodb://localhost:27017/user",{useNewUrlParser:true}, function(err, db) {//to create connection
//   if (err) throw err;
//   console.log("Database connected !");
  
//   db.collection("user_record").findOne({}, function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     //db.close();
//   });
// });


// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/user";
// MongoClient.connect(url, function(err, db) {//to create connection
//   if (err) throw err;
//   console.log("Database connected !");
// });


// var User = new Mongoose.Schema({
//     item: String,
//     qty: Number,
    
// })
// console.log(Mongoose.model("user_record",User));
// const ItemModel=Mongoose.model("user_record",User);



// const ItemModel = Mongoose.model("user_record",{
// 	item:String,
// 	qty:[Number]
// });


const Schema = Mongoose.Schema;  
const itemShema = new Schema({
	item : String,
	qty : Number
});
const ItemModel = Mongoose.model('user_record',itemShema);


const ItemType= new GraphQLObjectType({
 	name:"user_record",
 	fields : {
 		item:{
			type:GraphQLString
		},
 		qty: {
 			type:GraphQLInt
 		},
 	}
});

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name:"Query",
		fields:{
			itemsList:{
				type: new GraphQLList(ItemType),
				resolve: async (root, args, context, info)=>{
					return await ItemModel.find().exec();//we can write query here related to db
				}
			},
		}
	})
});

 app.use("/graphql",graphqlHTTP(
       {
       	schema,
       	graphiql:true,
       }
	));


// const users=[
// 	{id:1,name:"master",age:27},
// 	{id:2,name:"rahul",age:24},
// 	{id:3,name:"rajesh",age:25},
// 	{id:4,name:"kavita",age:28},
// ];

// const UserType = new GraphQLObjectType({
// 	name:'Users',
// 	description:'.....',
// 	fields:{
// 		id:{
// 			type:GraphQLInt
// 		},
// 		name:{
// 			type:GraphQLString
// 		},
// 		age:{
// 			type:GraphQLString
// 		}
// 	}
// });
// const schema = new GraphQLSchema({
// 	query: new GraphQLObjectType({
// 	    name:"Query",
// 		description:"hello this is schema",//this is optional
// 		fields:()=>({//used to define query as name users or user
// 			users:{
// 				type: new GraphQLList(UserType),
// 				resolve: (parent,orgs)=>{
// 					return users;//we can write query here related to db
// 				}
// 			},
// 			user:{
// 				type: UserType,
// 				args:{
// 					id:{
// 						type:GraphQLInt,
// 					}
// 				},
// 				resolve: (parent,{ id })=>{
// 					const user = users.filter(user=>user.id == id);
// 					return user[0];
// 				}
// 			}
// 		}),
// 	})
// });

// app.use("/graphql",graphqlHTTP(
//        {
//        	schema,
//        	graphiql:true,
//        }
// 	),);

// app.get('/',(req,res)=>{
// 	const query = `query {users{id,name,age}}`;
// 	graphql(schema, "{users{id,name,age}}",query).then(response=>res.send(response)).catch(err=>res.send(err));
// });

// app.get('/:id',(req,res)=>{
// 	const query = `query {user(id: ${req.params.id}){id,name,age}}`;
// 	graphql(schema,query).then(response=>res.send(response)).catch(err=>res.send(err));
// });

app.listen('4000',()=>{ 
	console.log('this server is listening port 4000');
});