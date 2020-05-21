import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import BookList from './component/BookList';
import AddBooks from './component/AddBooks'; 

//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", 
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Mater Books and Author management system</h1>
        <BookList/>
        <AddBooks/>
      </div>
    </ApolloProvider>  
  );
}

export default App;



// import logo from './logo.svg';
// import './App.css';

      // <header className="App-header">//these code will be used when it needed
      //   <img src={logo} className="App-logo" alt="logo" />
      //   <p>
      //     Edit <code>src/App.js</code> and save to reload.
      //   </p>
      //   <a
      //     className="App-link"
      //     href="https://reactjs.org"
      //     target="_blank"
      //     rel="noopener noreferrer"
      //   >
      //     Learn React
      //   </a>
      // </header>