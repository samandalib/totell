import React , {Component} from 'react';

import SearchResults from './reactComponents/SearchPage/SearchResults.jsx';
import SearchForm from './reactComponents/SearchPage/SearchForm.jsx';

class SearchBox extends Component{
    constructor(props){
        super(props)
        this.state = {srchRslt:[]}

    }

    getList=()=>{
        fetch('/searchfilter')
            .then(res => res.json())
            //.then( json => console.log(json))
            .then(srchRslt => this.setState({ srchRslt }, ()=>console.log('setState in fetch process')))//it uses destructuring syntax
            // this.setState({list}) is equal to this.setState({list:list})
            .catch( err => console.log('ERROR IN FETCH: ',err))
    }
    componentDidMount(){
        this.getList()
    }

    render(){
        console.log('from render function at SearchBox.js', this.state.srchRslt)
        return(
            <div>
                <SearchForm action={this.getList}/>
                <SearchResults results={this.state.srchRslt}  />

            </div>
        )
    }
}


export default SearchBox;
