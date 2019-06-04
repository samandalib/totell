import React, { Component } from 'react';

import MenuBuilder from './reactComponents/MenuForm/MenuBuilder.jsx';

import restObject from './Papa Cristos.js';


class MenuManager extends Component{
    constructor(props){
        super(props)
        this.state={resultObject:{}}
        this.restaurantId =this.props.match.params.restaurantId
    }
    componentWillMount(){
        console.log(this.props)
        console.log("will Mount component: ", this.restaurantId)
    }
    componentDidMount(){
        //Fetch
        console.log('start componentDidMount')
        //this.getObejct()
        };

    /*getObject = () => {
        fetch(`/menu/restaurantId/${this.restaurantId}`)
            .then((res) => res.json())
            .then((result) => this.setState({restObject:result}))
            .catch((err)=>console.log('there is an error in fetching function'))
    }
}*/
/*
    render(){
        return(
            <p> restaurantID is: {this.restaurantId}</p>
        )
    }
    */
    render(){
        console.log(restObject)
        return(
            <div>
                <MenuBuilder restaurant = {restObject} />
            </div>
        );
    }
}
export default MenuManager;
