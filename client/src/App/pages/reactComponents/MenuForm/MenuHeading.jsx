import React, { Component } from 'react';

import RestInfo from '../RestInfo.js';
import ControlledInput from '../ControlledInput.js';

class MenuHeading extends Component{
    constructor(props){
        super(props)
        this.state = {tempValue:""}
    }
    render(){
        return(
            <div>

                <RestInfo name={this.props.restaurant} state ={this.props.State} city={this.props.city} address={this.props.address} zip={this.props.zip} id={this.props.restaurantId} />

                <form>

                    <ControlledInput type="text" id="text-input" onChange={this.props.handleChange} name="categoryInput" value={this.state.tempValue}  />
                    <button id="add-category" onClick={this.props.handleSubmit} name="Add Category">Add Category</button>
                </form>

                <div>
                    <button value='All' id="category-filter" onClick={this.props.handleFilter}>All</button>
                    {this.props.categoryNames.map((i) => {
                        return (
                            <div>
                                <button value={i} id="category-filter" onClick={this.props.handleFilter}>{i}</button>
                            </div>
                        );
                    })}

                </div>
            </div>
        )
    }

}

export default MenuHeading;
