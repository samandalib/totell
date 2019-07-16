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

                <div className="container" style={{backgroundColor:"black", width:"100%"}}>
                    <div className="grid">
                        <div className="row">
                            <div className= "col-lg-3">
                            </div>
                            <div className= "col-lg-12 col-sm-12">
                                <input id="srchfield" className ="form-control" name="searchtext" id="serchBox"  onChange={this.handleChange} value={this.state.filter}  type="text"  />
                            </div>
                            <button id="srchbut" className="btn btn-primary" onClick={this.handleSubmit}>search </button>
                        </div>
                    </div>
                </div>

        )

    }
}

export default SearchForm;
