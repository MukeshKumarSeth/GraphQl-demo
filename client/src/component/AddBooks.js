import React from 'react';
import {gql} from 'apollo-boost'//used to define query
import {graphql} from 'react-apollo'//to bind the defined query

const getAuthorQuery = gql`
	{
		authors{
			name
			id
		}
	}
`


class AddBooks extends React.Component{

	
	displayAuthors(){
		var data = this.props.data;
		if(data.loading){
			return (<option disabled>Loading Authors......</option>);
		}else{
			return data.authors.map(author=>{
				return(
					<option key = {author.id} value = {author.id}>{author.name}</option>
				)
			})
		}
	}
	render(){
		return(
    	<form id="add-book">
    		<div className="field">
    			<label>Book Name:</label>
    			<input type="text"/>
    		</div>

    		<div className="field">
    			<label>Genre:</label>
    			<input type="text"/>
    		</div>

    		<div className="field">
    			<label>Author Name:</label>
    			<select>
    				<option>Select author</option>
    				{this.displayAuthors()}
    			</select>
    		</div>

    		<button>+</button>
    	</form>
     	)
	}
}

export default graphql(getAuthorQuery)(AddBooks);//to bind query with booklist component