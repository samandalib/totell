import React , {Component} from 'react';

import SearchResults from './reactComponents/SearchPage/SearchResults.jsx';
import SearchForm from './reactComponents/SearchPage/SearchForm.jsx';

class SearchBox extends Component{
    constructor(props){
        super(props)
        this.state = {srchRslt:[], searchText:""}

    }
    setSearchText(text){
        this.setState({searchText:text},()=>console.log(`search text set to ${this.state.searchText}`))
    }

    getList(route){
        fetch(route)
            .then(res => res.json())
            //.then( json => console.log(json))
            .then(srchRslt => this.setState({ srchRslt }, ()=>console.log('setState in fetch process')))//it uses destructuring syntax
            // this.setState({list}) is equal to this.setState({list:list})
            .catch( err => console.log('ERROR IN FETCH: ',err))
    }
    resetResults(){//Reset the results data if another search keyword is submitted
        if (this.state.srchRslt){
            this.setState({srchRslt:[]})
        }
    }
    componentDidMount(){
        this.resetResults()
        this.setSearchText()
        //this.getList()
    }

    render(){
        console.log('from render function at SearchBox.js', this.state.srchRslt)
        if (!this.state.searchText && this.state.srchRslt.length==0){
            return (
                <SearchForm action={this.getList.bind(this)} srchText={this.setSearchText.bind(this)} resetResults={this.resetResults.bind(this)} />
            )
        }else if(this.state.searchText && this.state.srchRslt.length==0){
            return(
                <div>
                    <SearchForm action={this.getList.bind(this)} srchText={this.setSearchText.bind(this)} resetResults={this.resetResults.bind(this)} />
                    <p> Searching for {this.state.searchText} ... </p>
                </div>
            )
        } else if (this.state.searchText && this.state.srchRslt.length>0){
            return(
                <div>
                    <SearchForm action={this.getList.bind(this)} srchText={this.setSearchText.bind(this)} resetResults={this.resetResults.bind(this)} />
                    <SearchResults results={this.state.srchRslt}  srchText={this.state.searchText} />
                </div>
            )
        }
    }
}

export default SearchBox;
