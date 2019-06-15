import React, {Component} from 'react';

class SearchForm extends Component{//IT IS USED IN SearchBox.js

    constructor(props){
        super(props)
        this.state={filter:""}
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        this.setState({filter: e.target.value},()=>{
            console.log('from SearchForm.jsx, Filter set in handleChange: ', this.state.filter)
        })
    }
    render(){
        return(

                <form action='/filter' method='POST'>
                    <input name="searchtext" id="serchBox"  onChange={this.handleChange} value={this.state.filter}  type="text"  />
                    <input type='submit' onClick={this.props.action} value='Search' />
                </form>

        )

    }
}

export default SearchForm;
