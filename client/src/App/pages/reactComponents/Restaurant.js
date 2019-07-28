import React, { Component } from 'react';

import MenuShow from './MenuShow.js';
import RestInfo from './RestInfo.js';
import MenuBuilderShow from './MenuForm/MenuBuilderShow.jsx';
import NavBar from './NavBar.js';

class Restaurant extends Component{//IT IS USED IN RestShow.js and RestMenu.js and MenuShowPage.js
    constructor(props){
        super(props)
        this.state={activeUser:""}
    }
    getActiveUser(){
        fetch('/getuserinfo')
            .then(res=> res.json())
            .then(data => {
                this.setState({activeUser:data.username}, ()=>console.log(`Data from getActiveUser: ${this.state.activeUser}`))
            })
    }
    componentDidMount(){
        this.getActiveUser()
    }
    render(){

        return (
            <div>
                <NavBar username={this.state.activeUser} />

                <div className="container" style={{marginTop:"10%"}}>
                    <MenuBuilderShow restaurant = {this.props.data} />
                </div>
            </div>


      );
    }
}


export default Restaurant;
