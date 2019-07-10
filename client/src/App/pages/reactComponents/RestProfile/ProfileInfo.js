import React, {Component} from 'react';

class ProfileInfo extends Component{
    render(){
        return(
            <div>
                <h1 id="restaurantName">{this.props.data.name}</h1>
                <h3 id="restState">{this.props.data.city}, {this.props.data.state} </h3>
                <p className="info">{this.props.data.address} {this.props.data.zip}</p>
                <p className="info">Type: {this.props.data.type} </p>
                <p className="info">Currency: {this.props.data.currency}</p>
                <p className="info"> {this.props.data.website}</p>
                <p className="info"> Followers: {this.props.data.followers.length}</p>


            </div>
        )
    }
}

export default ProfileInfo;
