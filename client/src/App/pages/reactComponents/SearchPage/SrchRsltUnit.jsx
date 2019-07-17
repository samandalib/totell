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
        if (this.state.show == 0){
            let route = `/search/restaurant/${this.props.RestObject.name}`
            console.log(`route for expanding the menu ${route}`)
            this.getFullData(route)
        } else{
            this.setState({show:0})
        }

    }

    getFullData(route){
        fetch(route)
            .then(res => res.json())
            //.then( json => console.log(json))
            .then(fullData => this.setState({ fullData:fullData, show:1 }, ()=>console.log('setState in fetch process for getFullData:', this.state.fullData)))//it uses destructuring syntax
            // this.setState({list}) is equal to this.setState({list:list})
            .catch( err => console.log('ERROR IN FETCH: ',err))
    }


    render(){

        console.log('render function at SrchRsltUnit.jsx: ',this.props.RestObject)
        if (this.state.show == 1){
            return(
                <div>
                    <input id="exploreMenuButt" type="button"  value="Close Menu" onClick={this.handleClick}/>
                    <RestMenu data = {this.state.fullData} />

                </div>
            )
        }
        return (
            <div id="rsltunit" className="container" >
                <div className="grid">

                    <div className="row">
                        <div className= "col-lg-9">
                            <RestInfo  name={this.props.RestObject.name} type={this.props.RestObject.type} state ={this.props.RestObject.state} city={this.props.RestObject.city} address={this.props.RestObject.address} zip={this.props.RestObject.zip} />
                        </div>

                        <div className= "col-lg-3">
                            <input className="btn btn-primary" id="exploreMenuButt" type="button"  value="Show Menu" onClick={this.handleClick}/>
                        </div>
                    </div>
                </div>
            </div>

        )

    }
}

export default SrchRsltUnit;
