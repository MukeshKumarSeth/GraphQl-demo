import React from 'react';
import {graphql} from 'react-apollo'//to bind the defined query

import {getBookQuery} from '../queries/queries';


class BookDetails extends React.Component{
			displayBookDetails(){
			const {book} = this.props.data;
			console.log(book);
			if(book){
				return(
					<div>
						<h2>{book.name}</h2>
						<p>{book.genre}</p>
						<p>book.author.name</p>
						<p>All Books by this Author:</p>
						<ul className="other-books">
							{book.author.book.map(item=>{
								return <li key ={item.id}>{item.name}</li>
							})}
						</ul>
					</div>
					)
			}else{
				return (
					<div>No Book selected....</div>
				);
			}
		}
	render(){

		return(
			<div id="book-details">
				{this.displayBookDetails()}
			</div>
     	)
	}
}


export default graphql(getBookQuery,{
	options:(props)=>{
		return {
			variables:{
				id:props.bookId
			}
		}
	}
})
(BookDetails);//to bind query with booklist component