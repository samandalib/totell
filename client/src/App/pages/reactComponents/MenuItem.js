import React, { Component } from 'react';

import CurrencySelector from './CurrencySelector';
import IngredientTooltip from './Tooltip.jsx';

class MenuItem extends Component{//IT IS USED IN MenuShow.js
    constructor(props){
        super(props)
    }
    render(){
            return(
                  <div id="MenuItem">
                        //<ItemImage src={this.props.image} alt={this.props.title}/>
                        <ItemName name={this.props.title}/>
                        <ItemIngredients ings={this.props.ingredients}/>
                        <ItemPrice price={this.props.price} />
                        <CurrencySelector />
                        <ItemReview />

                  </div>
            );
    }
}



function ItemImage(props){
    return <img id="itemImage" src={props.src} alt={props.alt}/>
}

function ItemName(props){
    return <h4 id="itemName" >{props.name}</h4>
}

function ItemIngredients(props){
        return (
            <div id="itemIngredients">
                  <p>Ingredients</p>
                  {props.ings.map((i)=>
                      <IngredientTooltip title={i}/>
              )}
            </div>
        );
}

function ItemPrice(props){
    return(
        <div id="itemPrice">
            <p>Price: </p>
            <p>{props.currency}</p>
            <p>{props.price}</p>
        </div>
    );
}

function ItemReview(props){
    return  <button id="itemReview">Reviews</button>
}

export default MenuItem;
