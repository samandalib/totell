import React, {Component} from 'react';

class SearchForm extends Component{//IT IS USED IN SearchBox.js

    constructor(props){
        super(props)
        this.state={filter:"",route:""}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e){
        let filter = e.target.value
        let route = `/search/${filter}`
        this.setState({filter: filter, route:route},()=>{
            console.log('from SearchForm.jsx, Filter and Route handleChange: ', this.state.filter, this.state.route)
        })
    }
    handleSubmit(){
        this.props.action(this.state.route)
        this.props.srchText(this.state.filter)
        this.props.resetResults()
    }
    render(){
        return(

                <div>
                    <input name="searchtext" id="serchBox"  onChange={this.handleChange} value={this.state.filter}  type="text"  />
                    <button onClick={this.handleSubmit}>search </button>
                </div>

        )

    }
}

export default SearchForm;
