import React, { Component } from 'react';

import CurrencySelector from './CurrencySelector';

class Restaurant extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
          <div>
                  <h1 id="restaurantName">{this.props.name}</h1>
                  <h3 id="resLocation">{this.props.location}</h3>
                  <div>
                      {this.props.menus.map((i)=> <MenuCategory name={i.category} />)}
                  </div>
                  <div>
                      {this.props.menus.map((i)=> <Menu {...i} />)}
                  </div>
          </div>
      );
    }
}

class Menu extends Component{
    render(){
        return(
            <div>
              {this.props.items.map((i)=>
                      <MenuItem {...i} />)
              }
              </div>
        );
    }
}

class MenuItem extends Component{
    render(){
            return(
                  <div id="MenuItem">
                        <ItemImage src={this.props.image} alt={this.props.name}/>
                        <ItemName name={this.props.name}/>
                        <ItemIngredients ings={this.props.ingredients}/>
                        <ItemPrice currency ={this.props.currency} price={this.props.price} />
                        <ItemLanguage langs = {this.props.langs}/>
                        <CurrencySelector />
                        <ItemReview />
                  </div>
            );
    }
}

function MenuCategory(props){
    return <button>{props.name}</button>
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
                          <button>{i}</button>
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

function ItemLanguage(props){
        return(
            <div>

                <select id="itemLanguage">
                    {props.langs.map((i)=>
                                            <option>{i}</option>
                                    )
                    }
                </select>
            </div>
        );
}

function ItemReview(props){
    return  <button id="itemReview">Reviews</button>
}

export default Restaurant;
