import React, { Component } from 'react';

import MenuShow from './MenuShow.js';
import RestInfo from './RestInfo.js';
import MenuBuilderShow from './MenuForm/MenuBuilderShow.jsx';

class Restaurant extends Component{//IT IS USED IN RestShow.js and RestMenu.js and MenuShowPage.js

    render(){
        console.log('FROM Restaurant.js: ',this.props.data.menu)
/*
    FIRST VERSION OF THE COMPONENT REPLACED BY MENUBUILDERSHOW COMPONENT
        <div>
                  <RestInfo name={this.props.name} state ={this.props.state} city={this.props.city} address={this.props.address} zip={this.props.zip} />
                <div>
                    {this.props.menu.map((i)=> <MenuCategory name={i.category} />)}
                </div>
                <div>
                    {this.props.menu.map((i)=> <MenuShow {...i} />)}
                </div>
        </div>
*/
        return (
            <MenuBuilderShow restaurant = {this.props.data} />

      );
    }
}

/*
function MenuCategory(props){
    return <button>{props.name}</button>
}

*/

export default Restaurant;
