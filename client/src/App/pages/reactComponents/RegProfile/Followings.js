import React, {Component} from 'react';

import Waiting from '../Waiting.js';

class Followings extends Component{
    constructor(props){
        super(props)
        this.state={followings:[]}
    }

    getFollowingsDetails(){
        let followingsIdList = this.props.data
        let route = ""
        let followingsDetList = []
        for (let i=0; i<followingsIdList.length;i++){
            route =`/getrestbrief/${followingsIdList[i]}`
            console.log(`route in for loop at getFollowingsDetails: ${route}`)
            fetch(route)
                .then(res => res.json())
                .then(data=> {
                    console.log(`data in getFollowingsDetails ${data.name}`)
                    followingsDetList.push({data})
                })
/*
                .then(result=>this.setState({followings:result},()=>{
                    console.log(`setState followings at fetch: ${this.state.followings}`)
                }))
*/
                .catch(error=>console.log('error in fetch: ', error))
        }
        //console.log(`followingsDetList: ${followingsDetList}`)

        this.setState({followings:followingsDetList}, ()=>console.log('this.setState at getFollowingsDetails', this.state.followings))
    }
    componentDidMount(){
        this.getFollowingsDetails()
    }
    render(){
        /*
                        {this.state.restaurants.map( (i)=>{
                                    return <p>{i}</p>
                            })
                        }
        */
        console.log('FROM render at followings: ', this.state.followings)
        if(this.props.data.length ==0 ){
            return (
                <div>
                    <h3>Following Restaruants</h3>
                    <p> No restaurant is followed </p>
                </div>
            )
        }else{
            return(
                <div>
                <h3>Following Restaruants</h3>
                <p> You are following {this.props.data.length} restaurnats </p>
                <ul>
                {this.state.followings.map((i)=>{
                    return <li>{i.name}</li>
                })}
                </ul>
                </div>

            )
        }

    }
}

export default Followings;
