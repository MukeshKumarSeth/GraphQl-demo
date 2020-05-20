
const {GraphQLObjectType, 
	GraphQLString ,
	GraphQLSchema,
    GraphQLInt,
    GraphQLList ,
    GraphQLID} = require('graphql'); 
const ItemModel = require('../model/books.js');

var author = [
	{name:'Mukesh Kumar Soni',age:26,id:'1'},
	{name:'Rahul Raj',age:24,id:'2'},
	{name:'Bhawana Bist',age:28,id:'3'}
]

const BookType = new GraphQLObjectType({//to create book type object
	name: "Book",
	fields : ()=>({
		id : {type:GraphQLString},
	    name : {type:GraphQLString},
		genre : {type:GraphQLString}
	})
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields : ()=>({
		id : {type:GraphQLID},
	    name : {type:GraphQLString},
		age : {type:GraphQLInt}
	})
});

const RootQuery = new GraphQLObjectType({//to execute
	name: "RootQueryType",
	fields :{
		book:{//end point to feth from forntent
			type:BookType,
			arg : {id:{type : GraphQLString}},//it needed when we pass orgument from forntent
			resolve(){//this is a function which execute code to get data from db or other sources

			}
		},
		author:{//end point to feth from forntent
			type:AuthorType,
			args : {id:{type : GraphQLID}},//it needed when we pass orgument from forntent
			// resolve(){//this is a function which execute code to get data from db or other sources
			// 	return find(authers,{id:arg.id}); 
			// }
			resolve: (parent,{ id })=>{
				console.log('this is id',id);
				const user = author.filter(author=>author.id == id);
				return user[0];
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery
});

// const ItemType= new GraphQLObjectType({
//  	name:"User_record",
//  	fields : {
//  		item:{
// 			type:GraphQLString
// 		},
//  		qty: {
//  			type:GraphQLInt
//  		},
//  	}
// });

// const  RootQuery = new GraphQLObjectType({
// 		name:"Query",
// 		fields:{
// 			itemsList2:{
// 				type: new GraphQLList(ItemType),
// 				resolve: async (root, args, context, info)=>{
// 					return await ItemModel.find().exec();//we can write query here related to db
// 				}
// 			},
// 			addItem : {
// 				type : ItemType,
// 				args : {
// 					item:{type: GraphQLString},
// 					qty:{type: GraphQLInt}
// 				},
// 				resolve(parent,args){
// 					let itemList = new ItemModel({
// 						item :args.item,
// 						qty : args.qty
// 					});
// 					return itemList.save();
// 				}
// 			}
// 		}
// 	})

// module.exports = new GraphQLSchema({
// 	query: RootQuery
// });