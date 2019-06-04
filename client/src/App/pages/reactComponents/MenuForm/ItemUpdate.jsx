import React, { Component } from 'react';

import ControlledInput from '../ControlledInput.js'

class ItemUpdate extends Component{//IT IS USED IN ItemForm.jsx
    constructor(props){
        super(props)
        this.state = {
            name:this.props.title,
            price:this.props.price,
            description:this.props.description,
            ingredients:this.props.ingredients
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
            this.setState({[event.target.name]: event.target.value})
    }

    render(){
        //4 text input + 1 image upload
        return(
            <form action="/updateitem" method='POST'>
                <label>
                Item Name:
                <ControlledInput type="text" id= "itemName"  name="name" value = {this.props.title} action={this.handleChange}  className="textInput" />
                </label>
                <label>
                Item Price:
                <ControlledInput type="Number" id= "itemPrice"  name="price" value = {this.state.price} action={this.handleChange}  className="textInput" />
                </label>
                <label>
                Item Description:
                <ControlledInput type="textarea" id= "itemDescr"  name="description" value = {this.state.description} action={this.handleChange}  className="textInput" />
                </label>
                <label>
                Item Ingredients:
                <ControlledInput type="text" id= "itemIngs"  name="ingredients" value = {this.state.ingredients} action={this.handleChange}  className="textInput" />
                </label>

                <input id= "updateItem"  value = "Submit" type="submit" className="submit" />
                <input id= "cancelUpdate"  value = "Cancel" type="submit" className="submit" />

            </form>
        );
    }
}

export default ItemUpdate;
