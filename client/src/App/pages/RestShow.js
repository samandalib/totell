import React, { Component } from 'react';

import Restaurant from './reactComponents/Restaurant.js'

class RestShow extends Component {
    constructor(props){
        super(props)
        this.state = {
         list : []
        }
    }

    componentDidMount(){
        this.getList();
    }

    getList = () => {
        fetch('/restshow')
            .then(res => res.json())
            .then(list => this.setState({ list }))
    }

    render(){
        const { list } = this.state;
         return(
             <div>
                   <h1 id="totell"> TOTELL </h1>
                   {list.map((i)=>
                       <Restaurant {...i}/>
                   )}
             </div>
         );
    }
}

export default RestShow;
