import React, { Component } from 'react';

import MenuHeadingShow from './MenuHeadingShow.jsx';
import CategoryShow from './CategoryShow.jsx';
import FilteredItemsShow from './FilteredItemsShow.jsx';



class MenuBuilderShow extends Component{//IT IS USED IN MenuForm.js
    constructor(props){
        super(props)
        this.state = {
            filter:"All",
        }
        this.handleFilter = this.handleFilter.bind(this)
    };

    populateCategoryList(){
        let categoryList = []
        this.props.restaurant.menu.map((i) => {
            console.log('i from mapping: ', i.category)
            categoryList.push(i['category'])
        });
        return categoryList
    }

    handleFilter(event){
        let filter = event.target.value;
        this.setState({filter:filter})
        console.log('filter for: ', filter)
    }
    render(){
        let categoryList = this.populateCategoryList()
        console.log('restObject: ', this.props.restaurant)
        console.log('SEE Menu: ', this.props.restaurant.menu)
        console.log('SEE Filter: ', this.state.filter)
        console.log('Category Names: ', this.categoryNames)
            if (this.state.filter == 'All'){
                return(
                    <div id="menuBuilder">
                        <MenuHeadingShow
                            handleFilter = {this.handleFilter}
                            categoryNames ={categoryList}
                            restaurant={this.props.restaurant.name}
                            State ={this.props.restaurant.state}
                            city={this.props.restaurant.city}
                            address={this.props.restaurant.address}
                            zip={this.props.restaurant.zip}
                        />
                        {categoryList.map((i) => {
                            return (
                                <div>
                                    <CategoryShow name = {i} menu = {this.props.restaurant.menu} />
                                </div>
                            );
                        })}
                    </div>
                );
            } else {

                return(
                    <div>
                        <MenuHeadingShow
                            handleFilter = {this.handleFilter}
                            categoryNames ={categoryList}
                            restaurant={this.props.restaurant.name}
                            State ={this.props.restaurant.state}
                            city={this.props.restaurant.city}
                            address={this.props.restaurant.address}
                            zip={this.props.restaurant.zip}
                        />
                        {this.props.restaurant.menu.map((i) => {
                            if (i["category"] == this.state.filter){
                                console.log(true)
                                console.log('Category', i['category'])
                                console.log('Items', i['items'])
                                return (
                                    <div>
                                        <FilteredItemsShow name={i['category']} items={i['items']} />
                                    </div>
                                );
                            }
                        })}
                    </div>
                )

        }
    }
}
export default MenuBuilderShow;
