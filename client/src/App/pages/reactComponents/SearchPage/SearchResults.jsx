import React , {Component} from 'react';

import SrchRsltUnit from './SrchRsltUnit.jsx';
import Restaurant from '../Restaurant.js';

class SearchResults extends Component{//IT IS USED IN SearchBox.js
    render(){
        console.log('this.props.results from SearchResults.jsx', this.props.results)


        return(
            <div className="container">
                <div className="grid">

                    <div className="row">
                        <p>{this.props.results.length} search results for <strong> {this.props.srchText} </strong> </p>
                    </div>

                    <div className="row">
                        {this.props.results.map((r)=> {
                            console.log('SearchResults.jsx r is: ',r)
                            return(
                                    <SrchRsltUnit RestObject={r} />
                            )
                        })
                        }
                    </div>

                </div>
            </div>
        )

    }
}
export default SearchResults;
