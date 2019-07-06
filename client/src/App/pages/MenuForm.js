import React, { Component } from 'react';

import MenuBuilder from './reactComponents/MenuForm/MenuBuilder.jsx';


class MenuManager extends Component{
    constructor(props){
        super(props)
        this.state = {data:{address:"", city:"", currency:"", id:"", menu:[], menu_url:"", name:"", state:"", type:"", zip:"", owner:""}}
        this.restaurant =this.props.match.params.restaurant
        this.zip = this.props.match.params.zip
    }

    getFullData(route){
        console.log('getFullData fetch function: ', route)
        fetch(route)
            .then(res => res.json())
            //.then( json => console.log(json))
            .then(data => this.setState({ data}, ()=>console.log('setState in fetch process for getFullData:', this.state.data)))//it uses destructuring syntax
            // this.setState({list}) is equal to this.setState({list:list})
            .catch( err => console.log('ERROR IN FETCH: ',err))
    }

    componentDidMount(){
        //Fetch
        console.log('start componentDidMount')
        //this.getObejct()
        let route = `/menu/${this.props.match.params.restaurant}/${this.props.match.params.zip}`
        this.getFullData(route)
    }
    render(){

        return(
            <div>
                <MenuBuilder restaurant = {this.state.data} />
            </div>
        );
    }
}
export default MenuManager;
