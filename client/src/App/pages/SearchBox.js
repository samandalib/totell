import React , {Component} from 'react';

import ControlledInput from './reactComponents/ControlledInput.js';
import SearchResults from './reactComponents/SearchPage/SearchResults.jsx';

class SearchBox extends Component{
    constructor(props){
        super(props)
        this.state = {filter:this.props.match.params.searchFilter, srchRslt:[]}
        this.handleChange = this.handleChange.bind(this)
        console.log('The filter is set as: ',this.state.filter)
        console.log(this.props.match)

    }
    handleChange(e){
        this.setState({filter: e.target.value})
    }
    componentWillMount(){
        this.getList()
    }
    getList = () => {
        fetch(`/filter/Tawanna Thai`)
            .then(res => res.json())
            .then(srchRslt => this.setState({ srchRslt }))//it uses destructuring syntax
            // this.setState({list}) is equal to this.setState({list:list})
    }
    render(){
        console.log('from render function at SearchBox.js', this.state.srchRslt)
        return(
            <div>
                <div id="searchInput">
                    <input id="serchBox"  onChange={this.handleChange} value={this.state.filter}  type="text" name="searchBox"   />
                </div>
                <div>
                    <SearchResults results={this.state.srchRslt} />
                </div>
            </div>
        )
    }
}

export default SearchBox;
