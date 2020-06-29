import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

//components
import PersonList from './components/PersonList';
import AddPerson from './components/AddPerson';

//apollo client setup
const client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
            <div id="main">
                <h1>Моя родина:</h1>
                <PersonList />
                <AddPerson />
            </div>
        </ApolloProvider>
    );
  }
}

export default App;
