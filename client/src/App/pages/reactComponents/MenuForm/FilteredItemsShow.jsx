import React, { Component } from 'react';

import MenuItem from '../MenuItem.js';

class FilteredItemsShow extends Component{
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
        if (this.props.items.length>0){
            return(
                <div>

                    <h5 className="category-title">{this.props.name}</h5>

                    <div>
                        {this.props.items.map( (item) =>{
                            return(
                                    <div>
                                        <MenuItem title={item.title} ingredients={item.ingredients} price={item.price} />
                                    </div>
                            )})
                        }
                    </div>

                </div>
            )
        } else{
            return(
                <div>
                    <h5 className="category-title">{this.props.name}</h5>
                    <p>There is no item for this category</p>
                </div>
            )
        }

    }
}

export default FilteredItemsShow;
