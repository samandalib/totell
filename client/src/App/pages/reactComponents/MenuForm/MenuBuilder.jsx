import React, { Component } from 'react';

import RestInfo from '../RestInfo.js';
import ControlledInput from '../ControlledInput.js';
import MenuHeading from './MenuHeading.jsx';
import Category from './Category.jsx';
import FilteredItems from './FilteredItems.jsx';

import './menuBuilderStyle.css';

class MenuBuilder extends Component{//IT IS USED IN MenuForm.js
    constructor(props){
        super(props)
        this.restObject = this.props.restaurant

        let categoryNames = []
        this.props.restaurant['menu'].map((i) => {
            categoryNames.push(i['category'])
        });

        this.categories = categoryNames

        this.state = {
            categoryCount:0,
            categoryNames:[],
            tempValue:"",
            filter:"All",
        }

        this.restaurant = this.props.restaurant.name
        this.State = this.props.restaurant.state
        this.city = this.props.restaurant.city
        this.address= this.props.restaurant.address
        this.zip = this.props.restaurant.zip
        this.restaurantId = this.props.restaurant.id

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFilter = this.handleFilter.bind(this)
        this.handleChange = this.handleChange.bind(this)
    };

    componentWillMount(){
        this.setState({categoryNames:this.categories}, ()=>{
            console.log('will Mount', this.state.categoryNames);
        })
    }

/*WORKING ON THIS PART TO MAKE THE PAGE FOR MENU BUILDER*/

/*
    componentDidMount(){
        console.log('start componentDidMount with', this.restaurantId)
        console.log(`/menu/restaurantId/${this.restaurantId}`)
        let id = this.restaurantId
        this.getObejct()
    };

    getObject = () => {
        fetch(`/menu/restaurantId/${this.restaurantId}`)
            .then((res) => res.json())
            .then((result) => this.setState({restObject:result}))
            .catch((err)=>console.log('there is an error in fetching function'))
    }
*/


    handleChange(event){
        let newValue = event.target.value
        this.setState({tempValue:newValue}, ()=>{
            console.log('tempValue: ', this.state.tempValue)
        });
    }

    handleSubmit(){
        console.log('handleSubmit tempValue',this.state.tempValue)
        this.setState(
            {categoryNames:this.state.categoryNames.push(this.state.tempValue), tempValue:""}
            , ()=> console.log('Category Names: ',this.state.categoryNames, 'tempValue: ', this.state.tempValue)
        )
    }

    handleFilter(event){
        let filter = event.target.value;
        this.setState({filter:filter})
        console.log('filter for: ', filter)
        //this.setState({show:filter}, ()=>{
            //
            // WRITE CODE FOR : show items in which their category is same as filter value
            //
            //
    }

    /*componentWillMount(){
        //Populating the categoryNames List with category names fetched from menu field in db
        console.log('Will Mount',this.restaurantId);
        this.state.restObject.menu.map((i) => {
            let categoryName = i.category;
            let newArray = this.state.categoryNames.push(categoryName)
            this.setState({categoryNames:newArray})

            //let l1 = this.state.categoryNames;
            //let l2 = [...l1, categoryName]
            //this.setState({categoryNames:l2})
        })
        return
        console.log('category names ',this.state.categoryNames)
    };*/
    render(){
        console.log('restObject: ', this.restObject)
        console.log('SEE Menu: ', this.restObject.menu)
        console.log('SEE Filter: ', this.state.filter)
        console.log('Category Names: ', this.state.categoryNames)
        //////console.log('from render: ', this.state.categoryNames)
        //////console.log('info: ',this.restaurant,this.State,this.city,this.address,this.zip,this.restaurantId)
        //add Category Form
        //Category Filter Buttons
        //Populate each category with its Items
            if (this.state.filter == 'All'){
                return(
                    <div id="menuBuilder">
                        <MenuHeading
                            handleFilter = {this.handleFilter}
                            handleSubmit = {this.handleSubmit}
                            handleChange = {this.handleChange}
                            categoryNames ={this.state.categoryNames}
                            restaurant={this.restaurant}
                            State ={this.State}
                            City={this.city}
                            address={this.address}
                            zip={this.zip}
                            id={this.restaurantId}
                        />
                        {this.state.categoryNames.map((i) => {
                            return (
                                <div>
                                    <Category name = {i} menu = {this.props.restaurant.menu} />
                                </div>
                            );
                        })}
                    </div>
                );
            } else {

                return(
                    <div>
                        <MenuHeading
                            handleFilter = {this.handleFilter}
                            handleSubmit = {this.handleSubmit}
                            handleChange = {this.handleChange}
                            categoryNames ={this.state.categoryNames}
                            restaurant={this.restaurant}
                            State ={this.State}
                            City={this.city}
                            address={this.address}
                            zip={this.zip}
                            id={this.restaurantId}
                        />
                        {this.restObject.menu.map((i) => {
                            if (i["category"] == this.state.filter){
                                console.log(true)
                                console.log('Category', i['category'])
                                console.log('Items', i['items'])
                                return (
                                    <div>
                                        <FilteredItems name = {i['category']} menu = {i['items']} />
                                    </div>
                                );
                            }
                        })}
                    </div>
                )

        }
    }
}
export default MenuBuilder;
