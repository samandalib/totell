import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import RestInfo from '../RestInfo.js';
import Restaurant from '../Restaurant.js';

class SrchRsltUnit extends  Component{
    constructor(props){
        super(props)
        this.result = this.props.RestObject
        this.state={show:0}
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        if (this.state.show){
            this.setState({show:0})
        } else{
            this.setState({show:1})
        }
    }

    render(){
        if (this.state.show === 1){
            return(
                <div>
                    <input id="exploreMenuButt" type="button"  value="Close Menu" onClick={this.handleClick}/>
                    <Restaurant {...this.props.RestObject} />
                </div>
            )
        } else{
            return (

                <div>
                    <RestInfo  name={this.result.name} state ={this.result.state} city={this.result.city} address={this.result.address} zip={this.result.zip} />
                    <input id="exploreMenuButt" type="button"  value="Expand Menu" onClick={this.handleClick}/>
                </div>

            )
        }
    }
}

export default SrchRsltUnit;
