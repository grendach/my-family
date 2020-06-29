import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';



const getFamilyQuery = gql`
    {
        families{
            name
            id
        }
    }
`
class AddPerson extends Component {
    displayFamily(){
        var data = this.props.data;
        if(data.loading){
            return( <option disabled>Loading families</option> );
        } else {
            return data.families.map(family => {
                return( <option key={ family.id } value={family.id}>{ family.name }</option> );
            });
        }
    }
    
    render(){
        console.log(this.props);
        return(
            <form id="add-person">
            <div className="field">
                <label>Person name:</label>
                <input type="text" />
            </div>
            <div className="field">
                <label>Person Surname:</label>
                <input type="text" />
            </div>
            <div className="field">
                <label>Age:</label>
                <input type="number" />
            </div>
            <div className="field">
                <label>Bio:</label>
                <input type="text" />
            </div>
            <div className="field">
                <label>Family:</label>
                <select>
                    <option>Select family</option>
                    { this.displayFamily() }
                </select>
            </div>
            <button>+</button>

        </form>
        );
    }
}
export default graphql(getFamilyQuery)(AddPerson);