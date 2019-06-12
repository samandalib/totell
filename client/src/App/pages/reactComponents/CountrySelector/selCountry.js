import React from 'react';
import countries from './countries.js';

class CountrySelector extends React.Component{
    constructor(props){
        super(props)
        this.state={value:""}
        this.handleChange= this.handleChange.bind(this)
    }
    handleChange(e){
        this.setState({value: e.target.value},()=>
            this.props.action(this.state.value))
    }
    render(){
        return(
              <select id="country" value = {this.state.value} name="country" onChange={this.handleChange} >
                        {countries.map((i)=>
                                                <option value={i.name}>{i.name}</option>
                                        )
                        }
              </select>
        );
    }
};

export default CountrySelector;
