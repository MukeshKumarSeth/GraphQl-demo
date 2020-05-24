import React from 'react';
import {graphql} from 'react-apollo'//to bind the defined query
// import {flowRight as compose} from 'lodash';
import {getBookQuery} from '../queries/queries';
import DeleteBook from './DeleteBook';


class BookDetails extends React.Component{
	       	constructor(props){
	       		super(props);
	       		this.state={
	       			bookIdToDel:null
	       		}
	       	}

			displayBookDetails(){
			const {book} = this.props.data;
			console.log(this.props);
			if(book){
				return(
					<div>
						<h2>{book.name}</h2>
						<p>{book.genre}</p>
						<p>{book.author.name}</p>
						<p>All Books by this Author:</p>
						<ul className="other-books">
							{book.author.books.map(item=>{
								return <li key ={item.id}>{item.name}</li>
							})}
						</ul>
						<p id="delBook" value={book.id} onClick={(e)=>{this.setState({bookIdToDel:book.id})}}>Delete this book from list</p>
						<DeleteBook bookDelId={this.state.bookIdToDel}/>
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


export default 
graphql(getBookQuery,{
	options:(props)=>{
		return {
			variables:{
				id:props.bookId
			}
		}
	}
})
(BookDetails);//to bind query with booklist component


// ,
// graphql(deleBookMutation,{
// 	options:(props)=>{
// 		return {
// 			variables:{
// 				id:props.bookIdToDel
// 			}
// 		}
// 	}
// }))