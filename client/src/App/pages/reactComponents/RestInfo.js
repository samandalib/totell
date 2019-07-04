import React, { Component } from 'react';

class RestInfo extends Component{//This Compnent is used in Restaurant.js and SearchResaults.jsx
    render(){
        return(
            <div>
                <h1 id="restaurantName">{this.props.name}</h1>
                <h3 id="restState">{this.props.city}, {this.props.state} </h3>
                <p id="restAddress">{this.props.address} {this.props.zip}</p>

            </div>
        );
    }

}

export default RestInfo;
