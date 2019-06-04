import React, { Component } from 'react';

import MenuItem from './MenuItem.js'

class MenuShow extends Component{//IT IS USED IN Restaurant.js
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

export default MenuShow;
