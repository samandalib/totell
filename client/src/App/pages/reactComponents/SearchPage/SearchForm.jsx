import React, {Component} from 'react';

class SearchForm extends Component{//IT IS USED IN SearchBox.js

    constructor(props){
        super(props)
        this.state={filter:"",route:""}
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        this.setState({filter: e.target.value},()=>{
            let route = `/search/${this.state.filter}`
            this.props.action(route)
            console.log('from SearchForm.jsx, Filter set in handleChange: ', this.state.filter)
        })
    }
    render(){
        //                    <input type='submit' onClick={} value='Search' />


        return(

                <form action='/filter' method='POST'>
                    <input name="searchtext" id="serchBox"  onChange={this.handleChange} value={this.state.filter}  type="text"  />
                </form>

        )

    }
}

export default SearchForm;
