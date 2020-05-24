import React from 'react';
import {graphql} from 'react-apollo'//to bind the defined query
import {flowRight as compose} from 'lodash';
import {deleBookMutation,getBooksQuery} from '../queries/queries';
import BookDetails from './BookDetails';

class DeleteBook extends React.Component{
   	constructor(props){
	       		super(props);
	       		this.state={
	       			selectedNew:null
	       		}
	     }
	delBooks(){
		if(this.props.bookDelId){
		this.props.deleBookMutation({
			variables : {
				id:this.props.bookDelId
			},
			refetchQueries:[{query:getBooksQuery}]	//to fetch books just after saving books and show
		});
		return(
			<div>
			<BookDetails bookId={this.state.selectedNew}/>
		</div>
		)
		}
	
	}
	render(){
		return(
    	<div id="">
    			{this.delBooks()}

    	</div>
     	)

	}
}

export default compose(
	graphql(deleBookMutation,{name:"deleBookMutation"}),
)(DeleteBook);//to bind query with booklist component

// export default 
// graphql(deleBookMutation,{
// 	options:(props)=>{
// 		return {
// 			variables:{
// 				id:props.bookDelId	
// 			}
// 		}
// 	}
// })
// (DeleteBook);//to bind query with booklist component

// export default compose(
// graphql(deleBookMutation,{
// 	options:(props)=>{
// 		return {
// 			variables:{
// 				id:props.bookDelId
// 			}
// 		}
// 	}
// }))
// (DeleteBook);//to bind query with booklist component