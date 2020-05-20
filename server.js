
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


const ItemType= new GraphQLObjectType({
 	name:"User_record",
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
			itemsList2:{
				type: new GraphQLList(ItemType),
				resolve: async (root, args, context, info)=>{
					return await ItemModel.find().exec();//we can write query here related to db
				}
			},
			addItem : {
				type : ItemType,
				args : {
					item:{type: GraphQLString},
					qty:{type: GraphQLInt}
				},
				resolve(parent,args){
					let itemList = new ItemModel({
						item :args.item,
						qty : args.qty
					});
					return itemList.save();
				}
			}
		}
	})
});

 app.use("/graphql",graphqlHTTP(
       {
       	schema,
       	graphiql:true,
       }
	));

app.listen('4000',()=>{ 
	console.log('this server is listening port 4000');
});