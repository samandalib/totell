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
            boardText:""
            }
        }
    }
    getPartialData(route){
        console.log('starting fetch')
        fetch(route)
            .then(res => res.json())
            .then(data => this.setState({data}, ()=>console.log('setState in fetch: ', data)))

    }
    componentDidMount(){
        let route = `/restprofile/${this.props.match.params.restname}/${this.props.match.params.zip}`
        console.log('route to fetch: ', route)
        this.getPartialData(route)
    }
    render(){
        let name = this.props.match.params.restname
        let zip = this.props.match.params.zip
        let menuRoute = `/menu/${name}/${zip}`
        console.log(`menuRoute: ${menuRoute}`)
        return(
            <div>
                <h1> TOTELL </h1>
                <ProfileInfo  data={this.state.data}/>
                <button>Follow</button>
                <Link to={menuRoute}>
                    <button>SHOW MENU </button>
                </Link>

            </div>

        )
    }
}
export default RestPageShow
