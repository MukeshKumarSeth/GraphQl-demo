import React from 'react';
import {gql} from 'apollo-boost'//used to define query
import {graphql} from 'react-apollo'//to bind the defined query
const getBooksQuery = gql`
	{
		books{
			name
			id
		}
	}
`


class BookList extends React.Component{
	displayBooks(){
		var data = this.props.data;
		if(data.loading){
			return (<div>Loading Books......</div>);
		}else{
			return data.books.map(book=>{
				return(
					<li key = {book.id}>{book.name}</li>
				)
			})
		}
	}
	render(){
		return(
    	<div id="">
    		<ul id ="book-list">
    			{this.displayBooks()}
    		</ul>
    	</div>
     	)
	}
}

export default graphql(getBooksQuery)(BookList);//to bind query with booklist component