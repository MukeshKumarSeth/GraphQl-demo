import React from 'react';

import {graphql} from 'react-apollo'//to bind the defined query
import {getBooksQuery} from '../queries/queries';
import BookDetails from './BookDetails';


class BookList extends React.Component{
	constructor(props){
		super(props);
		this.state={
			selected:null
		}
	}
	displayBooks(){
		var data = this.props.data;
		if(data.loading){
			return (<div>Loading Books......</div>);
		}else{
			return data.books.map(book=>{
				return(
					<li key = {book.id} onClick={(e)=>{this.setState({selected:book.id})}}>{book.name}</li>
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
    		<BookDetails bookId={this.state.selected}/>
    	</div>
     	)
	}
}

export default graphql(getBooksQuery)(BookList);//to bind query with booklist component