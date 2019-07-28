import React, { Component } from 'react';

import CurrencySelector from './CurrencySelector.js';
import IngredientTooltip from './Tooltip.jsx';
import CommentIcon from './RestProfile/icons/CommentIcon.jsx'

class MenuItem extends Component{//IT IS USED IN MenuShow.js
    render(){
            return(
                  <div id="MenuItem">
                    <div calssName="container" style={{width:"100%"}}>
                        <div className="row">

                            <div className="col-lg-2">
                                <ItemName name={this.props.title}/>
                            </div>

                            <div className="col-lg-4">
                                <ItemIngredients ings={this.props.ingredients}/>
                            </div>

                            <div className="col-lg-2">
                                <ItemPrice price={this.props.price} />
                            </div>

                            <div className="col-lg-2">
                                <CurrencySelector />
                            </div>

                            <div className="col-lg-2" style={{marginTop:"25px"}}>
                                <ItemReview />
                            </div>

                        </div>
                    </div>
              </div>
            );
    }
}



function ItemImage(props){
    return <img id="itemImage" src={props.src} alt={props.alt}/>
}

function ItemName(props){
    return <h6 id="itemName" >{props.name}</h6>
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
    return  <button id="itemReview"> <CommentIcon /> </button>
}

export default MenuItem;
