import React, { Component } from 'react';

import RestInfo from '../RestInfo.js';

class MenuHeading extends Component{
    render(){
        return(
            <div>

                <RestInfo name={this.props.restaurant} state ={this.props.State} city={this.props.city} address={this.props.address} zip={this.props.zip} id={this.props.restaurantId} />

                <form action="/updatemenu" onSubmit={this.props.handleSubmit} method="POST" >

                    <input type="text" id="text-input" onChange={this.props.handleChange} name="categoryInput" value={this.props.tempValue}  />
                    <input id="add-category"  type="submit" value = "Add Category" />
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
