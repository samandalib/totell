import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import ProfileInfo from './reactComponents/RestProfile/ProfileInfo.js'
import RestBoard from './reactComponents/RestProfile/RestBoard.js'
import CommentsBox from './reactComponents/RestProfile/CommentsBox.js'
import PhotoGallery from './reactComponents/RestProfile/PhotoGallery.js'
import SearchBox from './SearchBox.js'

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

        }
        this.handleFollow=this.handleFollow.bind(this)
        this.handleUnfollow = this.handleUnfollow.bind(this)
    }
    //CHECK TO SEE IF THE USER IN SESSION FOLLOWS THE PAGE OF THIS RESTAURANT, IT EFFECTS THE STATUS OF THE FOLLOW BUTTON
    checkFollowStatus(){
        let route = `/checkfollow/${this.props.match.params.restname}/${this.props.match.params.zip}`
        fetch(route)
            .then(res => res.json())
            .then(data => this.setState({followStatus:data[0].followStatus}, ()=>console.log(`from checkFollowStatus: ${this.state.followStatus}`)))
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
    handleFollow(){
        let followStatus = 1
        console.log('followStatus from handleFollow changed to: ', followStatus)
        //follow the page
        let route = `/putfollow/${this.state.data.name}/${this.state.data.zip}/${followStatus}`
        console.log('route from handleFollow: ', route)
        this.updateData(this.state.data, followStatus, route)
    }

    handleUnfollow(){
        let followStatus = 0
        let data = this.state.data
        let name = data.name
        let zip = data.zip

        console.log('followStatus from handleUnfollow changed to: ', followStatus)
        let route = `/putfollow/${name}/${zip}/${followStatus}`
        console.log('route from handleFollow: ', route)
        this.updateData(data, 0, route)
    }

    componentDidMount(){
        this.checkFollowStatus()
        let route = `/restprofile/${this.props.match.params.restname}/${this.props.match.params.zip}`
        console.log('route to fetch after componend did mount: ', route)
        this.getPartialData(route)

    }

    render(){
        let name = this.props.match.params.restname
        let zip = this.props.match.params.zip
        let menuRoute = `/menu/${name}/${zip}`
        console.log(`menuRoute: ${menuRoute}`)
        console.log(`followStatus at render: ${this.state.followStatus}`)
        if (this.state.followStatus){
            return(
                <div>
                    <h1> TOTELL </h1>
                    <ProfileInfo  data={this.state.data}/>
                    <button onClick={this.handleUnfollow}>Following</button>
                    <Link to={menuRoute}>
                        <button>SHOW MENU </button>
                    </Link>
                    <SearchBox />

                </div>

            )
        } else{
            return(
                <div>
                    <h1> TOTELL </h1>
                    <ProfileInfo  data={this.state.data}/>
                    <button onClick={this.handleFollow}>Follow</button>
                    <Link to={menuRoute}>
                        <button>SHOW MENU </button>
                    </Link>
                    <SearchBox />
                </div>

            )
        }
    }
}
export default RestPageShow
