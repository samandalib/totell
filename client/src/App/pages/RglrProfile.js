import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import NavBar from './reactComponents/NavBar.js'
import SearchBox from './SearchBox.js'
import Followings from './reactComponents/RegProfile/Followings.js'
import ShowProfile from './ShowProfile.js'

class RglrProfile extends Component{
    constructor(props){
        super(props)
        this.subjectUser = this.props.match.params.user
        this.state = {subjectUser:"",followings:[], activeUser:""}
        this.restList = []
    }

    getActiveUser(){
        fetch('/getuserinfo')
            .then(res=> res.json())
            .then(data => {
                this.setState({activeUser:data.username}, ()=>console.log(`Data from getActiveUser: ${this.state.activeUser}`))
            })
    }

    getProfileInfo(route){
        console.log('FROM getProfileInfo at RglrProfile')
        fetch(route)
            .then(res => res.json(res))
            .then(data => {

                if (!data.following || data.following.length == 0){
                    let subjectUser = data.username
                    let followings = []
                    this.setState({subjectUser:subjectUser, followings:followings})
                }else{
                    console.log('data following : ', data.following.length, data.following[0]._id)
                    let followings = []
                    let subjectUser = data.username
                    for (let i=0; i<data.following.length; i++){
                        followings.push(data.following[i]._id)
                    }
                    console.log(`followings in fetch: ${followings}`,typeof(followings))
                    this.setState(
                        {subjectUser:subjectUser, followings:followings},

                    )
                }

            })

    }

    getRestInfo(route){
        console.log(`getRestInfo for route ${route}`)
        fetch(route)
            .then(res => res.json())
            .then(data => this.restList.push(data))
    }


    componentDidMount(){
        console.log('FROM ComponentDidMount at RglrProfile')
        console.log(`this.props.match.params.user: ${this.props.match.params.user}`)
        let route = `/regprofile/${this.props.match.params.user}`
        this.getProfileInfo(route)
        this.getActiveUser()

    }

    render(){
        console.log('Followings: ',this.state.followings, typeof(this.state.followings))
        console.log(`this.restList: ${this.restList}`)
        console.log('FROM RENDER At RglrProfile', this.state.followings)

        let subjUserRoute = `/regprofile/${this.state.subjectUser}`

        if(this.state.subjectUser != this.state.activeUser){
            console.log(`subjectUser is NOT same as activeUser: ${this.state.subjectUser} vs ${this.state.activeUser}`)
            return (
                <div>
                    <NavBar />
                    <ShowProfile subject={this.state.subjectUser} />//You cannot see this page
                </div>
            )

        } else{
            console.log(`subjectUser is the same as activeUser: ${this.state.subjectUser} vs ${this.state.activeUser}`)
            return (
                <div>
                    <NavBar />
                    <div className="container"  style={{marginTop:"10%"}}>
                        <div className="grid">
                            <div className="row">
                                <SearchBox />
                            </div>

                            <div className="row">
                                <Followings subject="You" data = {this.state.followings} showAll={1}/>
                            </div>

                        </div>
                    </div>
                </div>

            )
        }
    }
}

export default RglrProfile;
