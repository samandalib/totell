import React, { Component } from 'react';


import MenuBuilderShow from './MenuForm/MenuBuilderShow.jsx';

class Restaurant extends Component{//IT IS USED IN RestShow.js and RestMenu.js and MenuShowPage.js

    render(){

        return (
            <div>

                <div className="container" style={{marginTop:"10%"}}>
                    <MenuBuilderShow restaurant = {this.props.data} />
                </div>
            </div>


      );
    }
}


export default Restaurant;
