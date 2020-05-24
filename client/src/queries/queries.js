import {gql} from 'apollo-boost'//used to define query

const getBooksQuery = gql`
	{
		books{
			name
			id
		}
	}
`
const getAuthorQuery = gql`
	{
		authors{
			name
			id
		}
	}
`
const addBookMutation = gql`
	mutation($name:String!,$genre:String!,$authorId:ID!){
		addBook(name:$name,genre:$genre,authorId:$authorId){
			name
			id
		}
	}
`
//to get book detail
const getBookQuery = gql`
	query($id:ID){
		book(id:$id){
			id
			name
			genre
			author{
				id
				name
				age
				books{
					name
					id
				}
			}
		}
	}
`
const deleBookMutation = gql`
	mutation($id:ID!){
		delBook(id:$id){
			id
			name
			genre
		}
	}
`
export {getBooksQuery,getAuthorQuery,addBookMutation,getBookQuery,deleBookMutation};