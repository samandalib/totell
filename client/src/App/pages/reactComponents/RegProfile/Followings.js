import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import Waiting from '../Waiting.js';
import RestMenu from '../RestMenu.js'
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
                    console.log(`data in getFollowingsDetails ${data.name} , ${data.country}, ${data.state}, ${data.city}, ${data.zip}`)
                    followingsDetList.push([data.name, data.country, data.state, data.city,data.zip])
                    console.log(`followingsDetList inside fetch: ${followingsDetList}`)
                    this.setState({followings:followingsDetList}, ()=>console.log('this.setState at getFollowingsDetails', this.state.followings))
                })
/*
                .then(result=>this.setState({followings:result},()=>{
                    console.log(`setState followings at fetch: ${this.state.followings}`)
                }))
*/
                .catch(error=>console.log('error in fetch: ', error))
        }
        //console.log(`followingsDetList: ${followingsDetList}`)


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
                    <table>
                    <thead>
                        <th>Name </th>
                        <th>Country</th>
                        <th>State </th>
                        <th>City </th>
                        <th>Zip </th>
                    </thead>
                    <tbody>
                    {this.state.followings.map((i)=>{
                        return(

                        <tr>
                            <Link to={`/restProfile/${i[0]}/${i[4]}`}>
                                <td>{i[0]}</td>
                            </Link>
                            <td>{i[1]}</td>
                            <td>{i[2]}</td>
                            <td>{i[3]}</td>
                            <td>{i[4]}</td>
                        </tr>
                    )
                    })}
                    </tbody>
                    </table>
                </div>

            )
        }

    }
}

export default Followings;
