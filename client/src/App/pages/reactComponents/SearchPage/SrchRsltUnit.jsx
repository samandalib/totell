import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import RestInfo from '../RestInfo.js';
import RestMenu from '../RestMenu.js';

class SrchRsltUnit extends  Component{//It is used in SearchResults.jsx
    constructor(props){
        super(props)
        this.state={show:0, fullData:[], route:""}
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(e){
        let route = `/search/restaurant/${e.target.value}`
        console.log(`route for expanding the menu ${route}`)
        this.getFullData(route)
    }

    getFullData(route){
        fetch(route)
            .then(res => res.json())
            //.then( json => console.log(json))
            .then(fullData => this.setState({ fullData:fullData, show:1 }, ()=>console.log('setState in fetch process for getFullData:', this.state.fullData)))//it uses destructuring syntax
            // this.setState({list}) is equal to this.setState({list:list})
            .catch( err => console.log('ERROR IN FETCH: ',err))
    }
    closeMenu(){
        this.setState({show:0})
    }

    render(){
        let route = `/menu/${this.props.RestObject.name}`
        console.log('render function at SrchRsltUnit.jsx: ',this.props.RestObject)
        if (this.state.show == 1){
            return(
                <div>
                    <RestMenu data = {this.state.fullData} />
                    <input id="exploreMenuButt" type="button"  value="Close Menu" onClick={this.closeMenu.bind(this)}/>
                </div>
            )
        }
        return (
            <div>
                <Link to={route}>
                    <RestInfo  name={this.props.RestObject.name} state ={this.props.RestObject.state} city={this.props.RestObject.city} address={this.props.RestObject.address} zip={this.props.RestObject.zip} />
                </Link>
                <input id="exploreMenuButt" type="button"  value={this.props.RestObject.name} onClick={this.handleClick}/>
            </div>

        )

    }
}

export default SrchRsltUnit;
