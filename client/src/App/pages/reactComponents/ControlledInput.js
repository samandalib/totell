import React, { Component } from 'react';

class ControlledInput extends Component{
    constructor(props){
        super(props)
        this.state={value:""}
        this.handleChange=this.handleChange.bind(this)

    }
    handleChange(e){
        this.setState({value: e.target.value},()=>
            this.props.action(this.props.id, this.state.value))
    }
    render(){
        return(
        <input id={this.props.id}  onChange={this.handleChange} value={this.state.value}  type={this.props.type} name={this.props.name}   />
    );
    }
};

export default ControlledInput;
