import React, {Component} from 'react';

import ImageAvatar from './ImageAvatar'

class PhotoName extends Component{
    constructor(props){
        super(props)
        this.state={userImage:""}
    }

    getImage(route){
        fetch(route)
            .then(res=>res.json())
            .then(data => this.setState({userImage:data.userPhoto}, ()=>{
                console.log(this.state.userImage)
            }))
    }

    componentDidMount(){
        let route=`/getuserphoto/${this.props.username}`
        this.getImage(route)
    }
    render(){
        return(
            <div>
                <ImageAvatar image={this.state.userImage} />
                <h6>{this.props.username} </h6>
            </div>
        )
    }
}

export default PhotoName;
