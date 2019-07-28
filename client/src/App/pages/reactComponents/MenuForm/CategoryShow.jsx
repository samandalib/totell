import React, { Component } from 'react';

import MenuItem from '../MenuItem.js';

class CategoryShow extends Component{

    constructor(props){
        super(props)
        this.state={itemCount:0}
    }

    handleClick(){
        this.setState((prevState, props)=>{
            return{itemCount:prevState.itemCount + 1}
        })
    }

    render(){
        //console.log('this.props.menu in category component: ', this.props.menu)
        return(
            <div>

                <div className="container" style={{marginTop:"20px"}}>


                    <h5 className="category-title">{this.props.name}</h5>

                    <div>
                        {this.props.menu.map( (category) =>{
                            if (category['category'] == this.props.name){
                                return(
                                    category['items'].map( (item) =>{
                                            return(
                                                <div>
                                                <MenuItem title = {item['title']} price = {item['price']} description={item['description']} ingredients={item['ingredients']} />
                                                </div>
                                            )})
                                );
                            }
                        })}
                    </div>

                </div>

            </div>
        );
    }
}

export default CategoryShow;
