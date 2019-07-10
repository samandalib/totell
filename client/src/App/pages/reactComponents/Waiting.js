import React, {Component} from 'react'

class Waiting extends Component{
    constructor(props){
        super(props)
        
    }
    render(){
        if (!this.props.status){
            return <p>Loading Data ... </p>
        } else{

        }

    }
}

export default Waiting;
