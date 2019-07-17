import React, { Component } from 'react';

import {Link} from 'react-router-dom';

class RestInfo extends Component{//This Compnent is used in Restaurant.js and SearchResaults.jsx
    render(){
        let route = `/restprofile/${this.props.name}/${this.props.zip}`
        return(
            <div className="container" >
                <div className="grid">

                    <div className="row">
                        <div className= "col-lg-6">
                            <Link to={route}>
                                <h3 className="resthead">{this.props.name}</h3>
                            </Link>
                            <h4 className="restsubhead">{this.props.type} </h4>
                        </div>
                        <div className= "col-lg-6">
                            <h4 className="restinfo">{this.props.city}, {this.props.state} </h4>
                            <h4 className="restinfo">{this.props.address} {this.props.zip}</h4>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

}

export default RestInfo;
