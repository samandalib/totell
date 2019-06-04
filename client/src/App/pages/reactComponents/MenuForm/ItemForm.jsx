import React, { Component } from 'react';

import MenuItem from '../MenuItem.js';
import ItemUpdate from './ItemUpdate.jsx';

class ItemForm extends Component{//IT IS USED IN Category.jsx
    constructor(props){
        super(props)
        this.state = {update:0}
        //{name:"",price:"", description:"", ingredients:[]}
        this.handleChange=this.handleChange.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }
    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    };

    handleUpdate(){
        if (this.state.update == 0){
            this.setState({update:1})
        } else{
            this.setState({update:0})
        }
    };

    render(){
        //console.log('Item Update: ', this.props.title)
        if (this.state.update == 1){
            return(
                <div>
                    <ItemUpdate title={this.props.title} price={this.props.price} description={this.props.description} ingredients={this.props.ingredients} />
                </div>
            );
        } else if (this.state.update == 0 ) {
            return(
                <div>
                    <MenuItem title={this.props.title} ingredients={this.props.ingredients} price={this.props.price} />
                    <button id= "UpdateItem" className="submit" onClick={this.handleUpdate}>UPDATE</button>

                </div>
            );
        }


            // WRITE CODE FOR : "update" and "remove" button if exists else button "create"
    }
}

export default ItemForm;
