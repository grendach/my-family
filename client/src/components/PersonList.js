import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';



const getPersonQuery = gql`
    {
        humans{
            name
            id
        }
    }
`

class PersonList extends Component {
    displayFamilyMembers(){
        var data = this.props.data;
        if(data.loading){
            return( <div>Loading family members...</div> );
        } else {
            return data.humans.map(person => {
                return(
                    <li key={ person.id }>{ person.name }</li>
                );
            })
        }
    }
    render(){
        console.log(this.props);
        return(
            <div>
                <ul id="Family-list">
                    { this.displayFamilyMembers() }
                </ul>
            </div>
        );
    }
}
export default graphql(getPersonQuery)(PersonList);
