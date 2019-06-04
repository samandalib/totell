import React, { Component } from 'react';

class RestInfo extends Component{
    constructor(props){
        super(props)
        this.restaurant = this.props.name
        this.state = this.props.state
        this.city = this.props.city
        this.address= this.props.address
        this.zip = this.props.zip
        this.restaurantId = this.props.id
    }
    render(){
        return(
            <div>
                <h1 id="restaurantName">{`restaurantName: ${this.restaurant}`}</h1>
                <h3 id="restState">{this.city}, {this.state} </h3>
                <p id="restAddress">{this.address} {this.zip}</p>
            </div>
        );
    }

}

export default RestInfo;
