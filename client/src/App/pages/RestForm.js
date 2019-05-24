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

    handleChange(id,val){
        switch(id){
            case 1:
                this.setState({name:val});
                break;
            case 2:
                this.setState({country:val});
                break;
            case 3:
                this.setState({city:val});
                break;
            case 4:
                this.setState({address: val});
                break;
            case 5:
                this.setState({phone:val});
                break;
            case 6:
                this.setState({website:val});
                break;
            case 7:
                this.setState({email:val});
                break;
            case 8:
                this.setState({owner:val});
                break;

        };


    };

    handleSubmit(){
        try{
            this.setState({resDisplay:0, menuDisplay:1},()=>
                    console.log('resturan form submited and dispaly states changed')
            )

        }
        catch(err){
            console.log('an error occured and prevented form submit: '+err)
        }
    };

    render(){
        return(
            <div>
                <form action="/addrestaurant" onSubmit ={this.handleSubmit} method='POST'>
                    <h2>Restaurant Registration</h2>
                    <label>
                    Name:
                      <ControlledInput id= "1"  name="RestName" value = {this.state.name} action={this.handleChange} type="text" className="textInput" />
                    </label>
                    <label>
                    Country:
                      <CountrySelector id= "2"  name = "RestCountry" value = {this.state.country} action={this.handleChange} className="dropdownList" />
                    </label>
                    <label>
                    City:
                      <ControlledInput id= "3"  name="RestCity" value = {this.state.city} action={this.handleChange} type="text" className="textInput" />
                    </label>
                    <label>
                    Address:
                      <ControlledInput id= "4"  name="RestAddress" value = {this.state.address} action={this.handleChange} type="text" className="textInput" />
                    </label>
                    <label>
                    Phone:
                      <ControlledInput id= "5"  name="RestPhone" value = {this.state.phone} action={this.handleChange} type="tel" className="textInput" />
                    </label>
                    <label>
                    Website:
                      <ControlledInput id= "6"  name="RestWeb" value = {this.state.website} action={this.handleChange} type="text" className="textInput" />
                    </label>
                    <label>
                    Email:
                      <ControlledInput id= "7"  name="RestEmail" value = {this.state.email} action={this.handleChange} type="email" className="textInput" />
                    </label>
                    <label>
                    Owner:
                      <ControlledInput id= "8"  name="RestOwner" value = {this.state.owner} action={this.handleChange} type="text" className="textInput" />
                    </label>
                      <input id= "9"  value = "Add Restaurant" type="submit" className="submit" />
                </form>
            </div>
        );
    }
};


export default RestaurantForm;
