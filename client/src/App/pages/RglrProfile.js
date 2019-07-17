import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import NavBar from './reactComponents/NavBar.js'
import SearchBox from './SearchBox.js'
import Followings from './reactComponents/RegProfile/Followings.js'
import Waiting from './reactComponents/Waiting.js'


class RglrProfile extends Component{
    constructor(props){
        super(props)
        this.state = {username:"",followings:[]}
        this.restList = []
    }

    getUserInfo(route){
        console.log('FROM getUserInfo at RglrProfile')
        fetch(route)
            .then(res => res.json(res))
            .then(data => {

                if (!data.following || data.following.length == 0){
                    let username = data.username
                    let followings = []
                    this.setState({username:username, followings:followings})
                }else{
                    console.log('data following : ', data.following.length, data.following[0]._id)
                    let followings = []
                    let username = data.username
                    for (let i=0; i<data.following.length; i++){
                        followings.push(data.following[i]._id)
                    }
                    console.log(`followings in fetch: ${followings}`,typeof(followings))
                    this.setState(
                        {username:username, followings:followings},
/*
                        ()=> {
                            this.state.followings.forEach((i)=>{
                                let restRoute = `/getrestinfo/${i}`
                                this.getRestInfo(restRoute)
                            })

                            console.log(`data: ${data} username: ${username} followings:${followings}`)
                        }
*/
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
        this.getUserInfo(route)

    }

    render(){
        console.log('Followings: ',this.state.followings, typeof(this.state.followings))
        console.log(`this.restList: ${this.restList}`)
        console.log('FROM RENDER At RglrProfile', this.state.followings)
        if(!this.state.username){
            return <Waiting status="" />
        } else{
/*
            <div id="pageheader" className="row" style={{backgroundColor:"gray"}}>
                <div className= "col-lg-3 col-sm-4">
                    <h3 id="smalltotell">TOTELL</h3>
                </div>
                <div className= "col-lg-6 col-sm-4">
                </div>
                <div className= "col-lg-3 col-sm-4">
                    <h5 id="wlcm">Welcome <strong> {this.state.username}</strong></h5>
                    <form id="logoutform" action="/logout" method="POST">
                        <button className="btn btn-primary" id="logoutbut" type='submit'> Log out </button>
                    </form>
                </div>

            </div>
*/
            return (
                <div>
                    <NavBar username={this.state.username} />
                    <div className="container"  style={{marginTop:"10%"}}>
                        <div className="grid">
                            <div className="row">
                                <SearchBox />
                            </div>

                            <div className="row">
                                <Followings data = {this.state.followings} />
                            </div>

                        </div>
                    </div>
                </div>

            )
        }
    }
}

export default RglrProfile;
