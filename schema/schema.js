
const {GraphQLObjectType, 
	GraphQLString ,
	GraphQLSchema,//to creates schema
    GraphQLInt,
    GraphQLList ,
    GraphQLID,
    GraphQLNonNull//it used to check data shuld not b null 
    } = require('graphql'); 
// const ItemModel = require('../model/books.js');
const Book = require('../model/books.js');
const Author = require('../model/author.js');

const BookType = new GraphQLObjectType({//to create book type object
	name: "Book",
	fields : ()=>({
		id : {type:GraphQLID},
	    name : {type:GraphQLString},
		genre : {type:GraphQLString},
		author : {
			type : AuthorType,
			resolve(parent,args){
				return Author.findById(parent.authorId);
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields : ()=>({
		id : {type:GraphQLID},
	    name : {type:GraphQLString},
		age : {type:GraphQLInt},
		books : {
			type : new GraphQLList(BookType),
			resolve(parent,args){
				return Book.find({authorId:parent.id});
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({//to execute
	name: "RootQueryType",
	fields :{
		book:{//end point to feth from forntent or resolver of query type
			type:BookType,
			args : {id:{type : GraphQLID}},//it needed when we pass orgument from forntent
			resolve(parent,args){//this is a function which execute code to get data from db or other sources
				return Book.findById(args.id);
			}
		},

		books:{
			type:new GraphQLList(BookType),
			resolve(parent,args){
				return Book.find({});

			}	
		},

		authors:{
			type:new GraphQLList(AuthorType),
			resolve(parent,args){
				return Author.find({});

			}	
		},
		author:{//end point to feth from forntent
			type:AuthorType,
			args : {id:{type : GraphQLID}},//it needed when we pass orgument from forntent
			resolve(parent,args){//this is a function which execute code to get data from db or other sources
				return Author.findById(args.id); 
			},
		
	 }
	}
});

const Mutation = new GraphQLObjectType({//to update,delete and insert we use mutation
	name : "Mutation",
	fields : {
		addAuthor : { //resolver of mutation type
			type : AuthorType,
			args : {
				name: {type : new GraphQLNonNull(GraphQLString) },
				age : {type : new GraphQLNonNull(GraphQLInt)}
			},
			resolve(parent,args){
				let author = new Author({
					name : args.name,
					age : args.age
				});
				author.save();
				return author;
			}
		},
		addBook:{
			type : BookType,
			args : {
				name : {type : new GraphQLNonNull(GraphQLString)},
				genre : {type : new GraphQLNonNull(GraphQLString)},
				authorId : {type : new GraphQLNonNull(GraphQLID)}
			},
			resolve(parent,args){
				let book = new Book({
					name : args.name,
					genre : args.genre,
					authorId : args.authorId
				});
			    book.save();
			    return book;
			}
		},
		delBook:{//end point to feth from forntent or resolver of query type
			type:BookType,
			args : {id:{type : GraphQLID}},//it needed when we pass orgument from forntent
			resolve(parent,args){//this is a function which execute code to get data from db or other sources
				console.log('check for hit');
				return Book.findById(args.id).deleteOne();
			}
		}
		// delBook:{//end point to delete from forntent or resolver of query type
		// 	type:BookType,
		// 	args : {id:{type : GraphQLID}},//it needed when we pass orgument from forntent
		// 	resolve(parent,args){//this is a function which execute code to get data from db or other sources
		// 		const book =  Book.findById(args.id);
  //    				 // book.deleteOne();s
  //    				 return book;	
		// 	}
		// },
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});

// const ItemType= new GraphQLObjectType({21
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