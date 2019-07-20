import React, {Component} from 'react';

class FollowBut extends Component{
    constructor(props){
        super(props)
        this.state={followStatus:0}

    }

    handleFollow(){
        let followStatus = 1
        console.log('followStatus from handleFollow changed to: ', followStatus)
        //follow the page
        let route = `/putfollow/${this.props.data.name}/${this.props.data.zip}/${followStatus}`
        console.log('route from handleFollow: ', route)
        this.updateData(this.props.data, followStatus, route)
    }

    handleUnfollow(){
        let followStatus = 0
        let data = this.props.data
        let name = data.name
        let zip = data.zip

        console.log('followStatus from handleUnfollow changed to: ', followStatus)
        let route = `/putfollow/${name}/${zip}/${followStatus}`
        console.log('route from handleFollow: ', route)
        this.updateData(data, followStatus, route)
    }

    updateData(data, followStatus, route){
        console.log('FROM updateData route: ',route)
        fetch(route,{
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                this.setState({followStatus:followStatus})
                console.log('response from fetch in updateData: ', res)
            })
            .then(()=>console.log('data updated on database!!!'))
            .catch(error => console.log('Error in Updating data:', error))
    }


    render(){
        if (this.state.followStatus == 1){
            return (
                <button className="btn btn-primary" id="unfollowbut" onClick={this.handleUnfollow.bind(this)}>Following</button>
            )
        } else{
            if (this.props.followStatus ==1){
                return (
                    <button className="btn btn-primary" id="unfollowbut" onClick={this.handleUnfollow.bind(this)}>Following</button>
                )
            } else{
                return (
                    <button className="btn btn-primary" id="followbut" onClick={this.handleFollow.bind(this)}>Follow</button>
                )
            }
        }
    }
}

export default FollowBut;
