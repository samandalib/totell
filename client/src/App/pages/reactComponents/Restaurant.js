import React, { Component } from 'react';

import MenuShow from './MenuShow.js';
import RestInfo from './RestInfo.js';

class Restaurant extends Component{//IT IS USED IN RestShow.js

    render(){
        console.log('FROM Restaurant.js: ',this.props.menu)
        return (
          <div>
                    <RestInfo name={this.props.name} state ={this.props.state} city={this.props.city} address={this.props.address} zip={this.props.zip} />
                  <div>
                      {this.props.menu.map((i)=> <MenuCategory name={i.category} />)}
                  </div>
                  <div>
                      {this.props.menu.map((i)=> <MenuShow {...i} />)}
                  </div>
          </div>
      );
    }
}

function MenuCategory(props){
    return <button>{props.name}</button>
}


export default Restaurant;
