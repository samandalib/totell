import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import Waiting from '../Waiting.js';
import RestMenu from '../RestMenu.js'

class Followings extends Component{
    constructor(props){
        super(props)
        this.state={followings:null}
    }

    getFollowingsDetails(){
        let followingsIdList = this.props.data
        console.log(`IDs list from Followings: ${followingsIdList}, this.props.data: ${this.props.data}`)
        let route = ""
        let followingsDetList = []
        for (let i=0; i<followingsIdList.length;i++){
            route =`/getrestbrief/${followingsIdList[i]}`
            console.log(`route in for loop at getFollowingsDetails: ${route}`)
            fetch(route)
                .then(res => res.json())
                .then(data=> {
                    console.log(`data in getFollowingsDetails ${data.name} ,${data.type}, ${data.country}, ${data.state}, ${data.city}, ${data.zip}`)
                    followingsDetList.push([data.name, data.type, data.country, data.state, data.city,data.zip])
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
        console.log('LAUNCHING COMPONENTDIDMOUNT AT FOLLOWINGS')
        this.getFollowingsDetails()
    }

    render(){

        console.log('FROM render at followings: ', this.state.followings, 'props.data: ', this.props.data)
        if (!this.state.followings){
            return <Waiting status=""/>
        }else{
            if (this.props.showAll){
                console.log('ShowAll =1')
                if(this.props.data.length ==0 ){
                    return (
                        <div>
                            <h3>Following Restaruants</h3>
                            <p> {this.props.subject} follow no restuaruant! </p>
                        </div>
                    )
                }else{

                    return(
                        <div>
                            <h3>Following Restaruants</h3>
                            <p> {this.props.subject} are following {this.props.data.length} restaurnats </p>
                            <table className="table">
                            <thead>
                                <th scope="col">Name </th>
                                <th scope="col">Type </th>
                                <th scope="col">Country</th>
                                <th scope="col">State </th>
                                <th scope="col">City </th>
                                <th scope="col">Zip </th>
                                <th scope="col">Follow Status</th>
                            </thead>
                            <tbody>
                            {this.state.followings.map((i)=>{
                                return(

                                <tr>
                                    <Link to={`/restprofile/${i[0]}/${i[5]}`}>
                                        <td scope="row">{i[0]}</td>
                                    </Link>
                                    <td>{i[1]}</td>
                                    <td>{i[2]}</td>
                                    <td>{i[3]}</td>
                                    <td>{i[4]}</td>
                                    <td>{i[5]}</td>
                                    <td>working </td>
                                </tr>
                            )
                            })}
                            </tbody>
                            </table>
                        </div>

                    )
                }

            } else{
                console.log('ShowAll =0')
                if(this.props.data.length ==0 ){
                    return (
                        <div>
                            <h3>Following Restaruants</h3>
                            <p> {this.props.subject} follows no restuaruant! </p>
                        </div>
                    )
                }else{

                    return(
                        <div>
                            <h3>Following Restaruants</h3>
                            <p> {this.props.subject} is following {this.props.data.length} restaurnats </p>

                            <table className="table">
                                <th scope="col">Name </th>
                                <th scope="col">Type </th>
                                <th scope="col">Country</th>
                                <th scope="col">State </th>
                                <th scope="col">City </th>
                                <th scope="col">Zip </th>
                                <th scope="col">Follow Status</th>
                            {this.state.followings.map((i)=>{
                                return(

                                <tr>
                                    <Link to={`/restprofile/${i[0]}/${i[5]}`}>
                                        <td scope="row">{i[0]}</td>
                                    </Link>
                                    <td>{i[1]}</td>
                                    <td>{i[2]}</td>
                                    <td>{i[3]}</td>
                                    <td>{i[4]}</td>
                                    <td>{i[5]}</td>
                                    <td>working </td>
                                </tr>
                            )
                            })}

                            </table>
                        </div>

                    )
                }

            }
        }



    }
}

export default Followings;
