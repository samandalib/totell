import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import ProfileInfo from './reactComponents/RestProfile/ProfileInfo.js'
import RestBoard from './reactComponents/RestProfile/RestBoard.js'
import CommentsBox from './reactComponents/RestProfile/CommentsBox.js'
import PhotoGallery from './reactComponents/RestProfile/PhotoGallery.js'

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
            isfollower:0,
        }
        this.handleFollow=this.handleFollow.bind(this)
    }
    checkFollowStatus(){
        let route = `/checkfollow/${this.props.match.params.restname}/${this.props.match.params.zip}`
        fetch(route)
            .then(res => res.json())
            .then(data => console.log(`from checkFollowStatus: ${data}`))
    }
    getPartialData(route){
        console.log('starting fetch')
        fetch(route)
            .then(res => res.json())
            .then(data => this.setState({data}, ()=>console.log('setState in fetch: ', data)))

    }

    updateData(data, route){
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
                this.setState({followStatus:1})
                console.log('response from fetch in updateData: ', res)
            })
            .then(()=>console.log('updated!!!'))
            .catch(error => console.log('Error in Updating data:', error))
    }

    componentDidMount(){
        this.checkFollowStatus()
        let route = `/restprofile/${this.props.match.params.restname}/${this.props.match.params.zip}`
        console.log('route to fetch: ', route)
        this.getPartialData(route)

    }

    handleFollow(){
        console.log('followStatus: ', this.state.followStatus)
        let followStatus = this.state.followStatus
        let activeUser = this.state.isfollower
        if (!followStatus || !activeUser){
            //follow the page
            let route = `/putfollow/name/${this.state.data.name}/zip/${this.state.data.zip}/follow/${followStatus}`
            console.log('route from handleFollow: ', route)
            this.updateData(this.state.data,route)
        } else{
            //unfollow the page
        }
    }
    handleUnfollow(){

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

                </div>

            )
    }
}
}
export default RestPageShow
