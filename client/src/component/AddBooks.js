import React from 'react';
import {graphql} from 'react-apollo'//to bind the defined query
import {flowRight as compose} from 'lodash';
import {getAuthorQuery,addBookMutation,getBooksQuery} from '../queries/queries';


class AddBooks extends React.Component{
	constructor(props){
		super(props);
		this.state={
			name:'',
			genre:'',
			authorId:'' 
		}
	}

	displayAuthors(){
		var data = this.props.getAuthorQuery;
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

	submitForm(e){
		e.preventDefault();
		this.props.addBookMutation({
			variables : {
				name:this.state.name,
				genre : this.state.genre,
				authorId:this.state.authorId 
			},
			refetchQueries:[{query:getBooksQuery}]	//to fetch books just after saving books and show
		});
	}
	render(){
		return(
    	<form id="add-book" onSubmit={this.submitForm.bind(this)}>
    		<div className="field">
    			<label>Book Name:</label>
    			<input type="text" onChange={(e)=>this.setState({name:e.target.value})} />
    		</div>

    		<div className="field">
    			<label>Genre:</label>
    			<input type="text" onChange={(e)=>this.setState({genre:e.target.value})} />
    		</div> 

    		<div className="field">
    			<label>Author Name:</label>
    			<select onChange={(e)=>this.setState({authorId:e.target.value})}>
    				<option>Select author</option>
    				{this.displayAuthors()}
    			</select>
    		</div>

    		<button>+</button>
    	</form>
     	)
	}
}

export default compose(
	graphql(getAuthorQuery,{name:"getAuthorQuery"}),
	graphql(addBookMutation,{name:"addBookMutation"}),
)(AddBooks);//to bind query with booklist component