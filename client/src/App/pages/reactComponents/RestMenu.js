import React, {Component} from 'react';

import Restaurant from './Restaurant.js';

class RestMenu extends Component{//It is used in

    render(){
        console.log('props from RestMenu.js: ', this.props.data)
        return(
            <div>
                <Restaurant data={this.props.data} />

            </div>
        )
    }
}



export default RestMenu;
