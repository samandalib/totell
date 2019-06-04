import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import CountrySelector from './reactComponents/selCountry.js';
import ControlledInput from './reactComponents/ControlledInput.js';

class RestaurantForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            resDisplay:1, menuDisplay:0,
            name:"", country:"", city:"", address:"", phone:"", website:"", email:"", owner:"",
        };
        this.handleSubmit= this.handleSubmit.bind(this);
        this.handleChange= this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(){
        try{
            this.setState({restDisplay:0, menuDisplay:1},()=>
                    console.log('restaurant form submited and dispaly states changed')
            )

        }
        catch(err){
            console.log('an error occured and prevented form submit: '+err)
        }
    }

    render(){
        return(
            <div>
                <form action="/addrestaurant" onSubmit ={this.handleSubmit} method='POST'>
                    <h2>Restaurant Registration</h2>
                    <label>
                    Name:
                      <ControlledInput  name="name" value = {this.state.name} action={this.handleChange} type="text" className="textInput" />
                    </label>
                    <label>
                    Country:
                      <CountrySelector  name = "country" value = {this.state.country} action={this.handleChange} className="dropdownList" />
                    </label>
                    <label>
                    City:
                      <ControlledInput  name="city" value = {this.state.city} action={this.handleChange} type="text" className="textInput" />
                    </label>
                    <label>
                    Address:
                      <ControlledInput  name="address" value = {this.state.address} action={this.handleChange} type="text" className="textInput" />
                    </label>
                    <label>
                    Phone:
                      <ControlledInput  name="phone" value = {this.state.phone} action={this.handleChange} type="tel" className="textInput" />
                    </label>
                    <label>
                    Website:
                      <ControlledInput  name="website" value = {this.state.website} action={this.handleChange} type="text" className="textInput" />
                    </label>
                    <label>
                    Email:
                      <ControlledInput  name="email" value = {this.state.email} action={this.handleChange} type="email" className="textInput" />
                    </label>
                    <label>
                    Owner:
                      <ControlledInput  name="owner" value = {this.state.owner} action={this.handleChange} type="text" className="textInput" />
                    </label>
                      <input  value = "Add Restaurant" type="submit" className="submit" />
                </form>
            </div>
        );
    }
};


export default RestaurantForm;
