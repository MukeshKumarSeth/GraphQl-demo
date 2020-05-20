
const {GraphQLObjectType, GraphQLSTring ,GraphQLSchema} = requre('graphql'); 

const BookType = new GraphQLObjectType({
	name: "Book",
	fields : ()=>({
		id : {type:GraphQLSTring},
	    name : {type:GraphQLSTring},
		genre : {type:GraphQLSTring}
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields :{
		book:{//end point to feth from forntent
			type:BookType,
			arg : {id:{type : GraphQLSTring}},//it needed when we pass orgument from forntent
			resolve(){//this is a function which execute code to get data from db or other sources

			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});