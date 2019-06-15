import React, {Component} from 'react';

class RestMenu extends Component{
    render(){
        console.log('RestMenu.js params: ', this.props.match.params.restname)
        return(
            <h1>`Menu for ${this.props.match.params.restname} will be here`</h1>
        )
    }
}



export default RestMenu;
