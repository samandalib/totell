import React, {Component} from 'react';

import RestMenu from './reactComponents/RestMenu.js';
import Restaurant from './reactComponents/Restaurant.js';

class MenuShowPage extends Component{
    constructor(props){
        super(props)
        this.state = {data:{address:"", city:"", currency:"", id:"", menu:[], menu_url:"", name:"", state:"", type:"", zip:"", owner:""}}
        console.log( 'CHECK ROUTE', `/menu/${this.props.match.params.restaurant}`)
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
        let route = `/menu/${this.props.match.params.restaurant}`
        this.getFullData(route)
    }

    render(){
        //
        console.log('type of data: ', typeof(this.state.data))
        console.log('type of data.city: ', typeof(this.state.data.city))
        console.log('type of data.menu: ', typeof(this.state.data.menu))

            return(
                <div>
                    <p>  Menu for ... </p>
                    <Restaurant {...this.state.data} />


                </div>
            )
}
}

export default MenuShowPage;
