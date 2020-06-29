import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getFamilyQuery} from '../queries/queries';



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
                <label>Ім'я:</label>
                <input type="text" />
            </div>
            <div className="field">
                <label>Прізвище:</label>
                <input type="text" />
            </div>
            <div className="field">
                <label>Вік:</label>
                <input type="number" />
            </div>
            <div className="field">
                <label>Біографія:</label>
                <input type="text" />
            </div>
            <div className="field">
                <label>Родина:</label>
                <select>
                    <option>Оберіть родину</option>
                    { this.displayFamily() }
                </select>
            </div>
            <button>+</button>

        </form>
        );
    }
}
export default graphql(getFamilyQuery)(AddPerson);