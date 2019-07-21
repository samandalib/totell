import React, {Component} from 'react';

import Followings from './reactComponents/RegProfile/Followings.js';
import SearchBox from './SearchBox.js'

class ShowProfile extends Component{
    constructor(props){
        super(props)
        this.state = {subjectUser:"",followings:[]}
        this.restList = []
    }

    getProfileInfo(route){
        console.log('FROM getProfileInfo at ShowProfile.js')
        fetch(route)
            .then(res => res.json(res))
            .then(data => {

                if (!data.following || data.following.length == 0){
                    let followings = []
                    this.setState({followings:followings})
                }else{
                    console.log('data following : ', data.following.length, data.following[0]._id)
                    let followings = []
                    for (let i=0; i<data.following.length; i++){
                        followings.push(data.following[i]._id)
                    }
                    console.log(`followings in fetch: ${followings}`,typeof(followings))
                    this.setState(
                        {followings:followings},

                    )
                }

            })

    }

    componentDidMount(){

        let route = `/showprofile/${this.props.subject}`
        this.getProfileInfo(route)
    }


    render(){
        return(
            <div>
                <div className="container"  style={{marginTop:"10%"}}>
                    <div className="grid">
                        <div className="row">
                            <SearchBox />
                        </div>

                        <div className="row">
                            <Followings subject={this.props.subject} data={this.state.followings} showAll={0} />
                        </div>

                    </div>
                </div>
            </div>

        )

    }
}

export default ShowProfile;
