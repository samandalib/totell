import React, {Component} from 'react';

import Followings from './reactComponents/RegProfile/Followings.js';
import SearchBox from './SearchBox.js'

class ShowProfile extends Component{
    constructor(props){
        super(props)
        //this.state={data:[]}
        this.restList = []
    }

    getUserData(route){
        fetch(route)
            .then(res=>res.json())
            .then(data =>{
                console.log(`data from fetch at getUserData: ${data}`)
                //this.setState({data:data}, ()=>console.log(`this.state.data form ShowProfile: ${this.state.data}`))

            })

    }

    componentDidMount(){

        let route = `/showprofile/${this.props.subject}`
        console.log(`route at componentDidMount at ShowProfile: ${route}`)
        this.getUserData(route)
    }
    render(){
        console.log(`AT RENDER OF SHOWPROFILE; this.props.subject: ${this.props.subject}`)
        //console.log(`from ShowProfile: data: ${this.state.data} , type:${typeof(this.state.data)} `)


            return(
                <div>
                    <div className="container"  style={{marginTop:"10%"}}>
                        <div className="grid">
                            <div className="row">
                                <SearchBox />
                            </div>

                            <div className="row">
                                <Followings subject={this.props.subject} data={this.restList} showAll={0} />
                            </div>

                        </div>
                    </div>
                </div>

            )



    }
}

export default ShowProfile;
