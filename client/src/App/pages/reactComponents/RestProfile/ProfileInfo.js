import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class ProfileInfo extends Component{
    constructor(props){
        super(props)

    }
    render(){
        //
        if (this.props.data.website){
            let regfilter = /https?:\/\//
            let url = this.props.data.website
            let website = url.replace(regfilter, '')
            return(
                <div>
                    <h3 id="restaurantName">{this.props.data.name}</h3>
                    <h5 className="info">{this.props.data.state}, {this.props.data.city} <br />
                                            {this.props.data.address}, {this.props.data.zip}
                    </h5>
                    <p className="info"><strong>{this.props.data.type}</strong></p>
                    <p className="info">
                        <span>
                            <a href={url}>{website}</a>
                        </span><br />
                            Currency: {this.props.data.currency}<br />
                            Followers: {this.props.data.followers.length}
                    </p>
                </div>
                )
        } else{
            return(
                <div>
                    <h3 id="restaurantName">{this.props.data.name}</h3>
                    <h5 className="info" style={{fontWeight:"200"}}>{this.props.data.state}, {this.props.data.city} <br />
                                            {this.props.data.address}, {this.props.data.zip}
                    </h5>
                    <p className="info"><strong>{this.props.data.type}</strong></p>
                    <p className="info">
                        Currency: {this.props.data.currency}<br />
                        Followers: {this.props.data.followers.length}
                    </p>
                </div>
            )
        }

    }
}

export default ProfileInfo;
