import React , {Component} from 'react';
import { Link } from 'react-router-dom';

import SrchRsltUnit from './SrchRsltUnit.jsx';
import Restaurant from '../Restaurant.js';

class SearchResults extends Component{//IT IS USED IN SearchBox.js
    constructor(props){
        super(props)
        this.state={displayAll:1, selectedItem:{}}
        this.results = this.props.results
        this.launchMenuShow = this.launchMenuShow.bind(this)


    }

    launchMenuShow(obj){
        this.setState({ selectedItem:obj});
    }


    render(){
        console.log('this.props.results from SearchResults.jsx', this.props.results)
        console.log('displayAll Value from SearchResults.jsx: ', this.state.displayAll)
        //
/*
        if (this.state.displayAll==1){
*/
        return(
            <div>
                {this.props.results.map((r)=> {
                    console.log('SearchResults.jsx r is: ',r)
                    return(

                        <SrchRsltUnit RestObject={r} />
                    )
                })
                }
            </div>
        )
/*
        } else if (this.state.displayAll == 0){
            return(
                <div>
                <Link to="/search">
                    <button>Back to Search</button>
                </Link>
                    <Restaurant  {...this.state.selectedItem} />
                </div>
            )
        }
*/

    }
}
export default SearchResults;
