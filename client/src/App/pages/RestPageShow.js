import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import NavBar from './reactComponents/NavBar.js';
import FollowBut from './reactComponents/FollowBut.js'
import ProfileInfo from './reactComponents/RestProfile/ProfileInfo.js'
import RestBoard from './reactComponents/RestProfile/RestBoard.js'
import CommentsBox from './reactComponents/RestProfile/CommentsBox.js'
import PhotoGallery from './reactComponents/RestProfile/PhotoGallery.js'
import SearchBox from './SearchBox.js'
import Waiting from './reactComponents/Waiting.js';

class RestPageShow extends Component{
    constructor(props){
        super(props)
        this.state={data:{
            name:"", type:"",city:"", state:"", country:"", address:"", zip:"",
            rating:"", economy:"",
            comments:[], photos:[],
            boardText:"", followers:[],
            },

            followStatus:0,
            activeUser:"",
            wikidata:{},
            userImage:""

        }

    }
    //CHECK TO SEE IF THE USER IN SESSION FOLLOWS THE PAGE OF THIS RESTAURANT, IT EFFECTS THE STATUS OF THE FOLLOW BUTTON
    checkFollowStatus(){
        let route = `/checkfollow/${this.props.match.params.restname}/${this.props.match.params.zip}`
        fetch(route)
            .then(res => res.json())
            .then(data => this.setState({followStatus:data[0].followStatus}, ()=>console.log(`from checkFollowStatus: ${this.state.followStatus}`)))
    }

    getUserInfo(){
        console.log('getUserInfo execution')
        let route = "/getuserinfo"
        fetch(route)
            .then(res => res.json())
            .then(data => {
                this.setState({activeUser:data.username, userImage:data.photo})
                console.log(`data in getUserInfo ${data.username}`)
            })
            .catch(error => console.log(`Error in getUserInfo ${error}`))
    }

    //GET SOME GENERAL INFORMATION ABOUT THE RESTAURANT THAT THE USER SELECTED TO VISIT ITS PAGE
    getPartialData(route){
        console.log('starting fetch')
        fetch(route)
            .then(res => res.json())
            .then(data => this.setState({data}, ()=>console.log('setState in fetch: ', data)))

    }

    //IF THE USER FOLLOW/UNFOLLOW THE PAGE, THE DATA ON DB MUST BE UPDATED
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

    componentDidMount(){
        this.checkFollowStatus()
        this.getUserInfo()
        let route = `/restprofile/${this.props.match.params.restname}/${this.props.match.params.zip}`
        console.log('route to fetch after componend did mount: ', route)
        this.getPartialData(route)
        let apiUrl = "https://en.wikipedia.org/w/api.php action=query&revids=347819%7C5487%7C548945&format=jsonfm&formatversion=2"
    }

    render(){

        let name = this.props.match.params.restname
        let zip = this.props.match.params.zip
        let menuRoute = `/menu/${name}/${zip}`

        let activeUser = this.state.activeUser

        console.log(`menuRoute: ${menuRoute}`)
        console.log(`followStatus at render: ${this.state.followStatus}`)


        if(!this.state.data.name){
            return <Waiting />

        }else{

            if (this.state.followStatus){
                return(
                    <div>
                        <NavBar username={this.state.activeUser} />

                        <div className="container-fluid"  style={{marginTop:"10%"}}>
                            <div className="grid">

                                <div className="row">

                                    <div id="followbutton">
                                        <FollowBut data={this.state.data} followStatus= {this.state.followStatus} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className= "col-lg-4">
                                        <div id="restBrief">
                                            <ProfileInfo  data={this.state.data}/>
                                            <Link to={menuRoute}>
                                                <button id="showMenubut" className="btn btn-primary">SHOW MENU </button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className= "col-lg-4">

                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-6">
                                        <CommentsBox data={this.state.data} activeUser={this.state.activeUser} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            } else{

                return(
                    <div>
                        <NavBar username={this.state.activeUser} />

                        <div className="container-fluid"  style={{marginTop:"10%"}}>
                            <div className="grid">
                                <div className="row">

                                    <div id="followbutton">
                                        <FollowBut data={this.state.data} followStatus= {this.state.followStatus} />
                                    </div>
                                </div>
                                <div className="row">

                                    <div className= "col-lg-4">
                                        <div id="restBrief">
                                            <ProfileInfo  activeUser={this.state.activeUser} data={this.state.data}/>
                                            <Link to={menuRoute}>
                                                <button id="showMenubut" className="btn btn-primary">SHOW MENU </button>
                                            </Link>
                                        </div>

                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <CommentsBox data={this.state.data} activeUser={this.state.activeUser} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                )
            }
        }


    }
}
export default RestPageShow
