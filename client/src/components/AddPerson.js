import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getFamilyQuery} from '../queries/queries';



class AddPerson extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            surname: '',
            age: '',
            biography: '',
            familyId: ''
        };
    }

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
    submitForm(e){
        e.preventDefault()
        console.log(this.state);
    }
    
    render(){
        console.log(this.props);
        return(
            <form id="add-person" onSubmit={ this.submitForm.bind(this) } >
            <div className="field">
                <label>Ім'я:</label>
                <input type="text" onChange={ (e) => this.setState({ name: e.target.value }) } />
            </div>
            <div className="field">
                <label>Прізвище:</label>
                <input type="text" onChange={ (e) => this.setState({ surname: e.target.value }) } />
            </div>
            <div className="field">
                <label>Вік:</label>
                <input type="text" onChange={ (e) => this.setState({ age: e.target.value }) } />
            </div>
            <div className="field">
                <label>Біографія:</label>
                <input type="text" onChange={ (e) => this.setState({ biography: e.target.value }) } />
            </div>
            <div className="field">
                <label>Родина:</label>
                <select onChange={ (e) => this.setState({ familyId: e.target.value }) } >
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