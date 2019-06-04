import React, { Component } from 'react';

import ItemForm from './ItemForm.jsx';

class Category extends Component{
    constructor(props){
        super(props)
        this.state={itemCount:0}
    }
    handleClick(){
        this.setState((prevState, props)=>{
            return{itemCount:prevState.itemCount + 1}
        })
    };
    render(){
        //console.log('this.props.menu in category component: ', this.props.menu)
        return(
            <div>

                <h3>{this.props.name}</h3>

                <div>
                    {this.props.menu.map( (category) =>{
                        //console.log('THIS IS THE CATEGORY: ', category['category'], ' and props ', this.props.name)
                        //console.log("TEST IF: ", category['category'] == this.props.name)
                        if (category['category'] == this.props.name){
                            return(
                                category['items'].map( (item) =>{
                                        return(
                                            <div>
                                            <ItemForm title = {item['title']} price = {item['price']} description={item['description']} ingredients={item['ingredients']} />
                                            </div>
                                        )})
                            );
                        }
                    })}
                </div>

                <button id="add-item" onClick={this.handleClick}>ADD ITEM</button>

            </div>
        );
    }
}

export default Category;
