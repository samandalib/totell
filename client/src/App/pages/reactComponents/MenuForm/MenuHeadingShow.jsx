import React, { Component } from 'react';

import RestInfo from '../RestInfo.js';

class MenuHeadingShow extends Component{
    render(){
        return(
            <div>

                <RestInfo name={this.props.restaurant} state ={this.props.State} city={this.props.city} address={this.props.address} zip={this.props.zip} id={this.props.restaurantId} />

                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <button value='All' className="btn btn-primary filterbut"  onClick={this.props.handleFilter}>All</button>
                                {this.props.categoryNames.map((i) => {
                                    return (
                                        <div>
                                            <button className="btn btn-primary filterbut" value={i} id="category-filter" onClick={this.props.handleFilter}>{i}</button>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default MenuHeadingShow;
