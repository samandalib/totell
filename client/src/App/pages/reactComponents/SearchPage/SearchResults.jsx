import React , {Component} from 'react';
import { Link } from 'react-router-dom';

import SrchRsltUnit from './SrchRsltUnit.jsx';
import Restaurant from '../Restaurant.js';

class SearchResults extends Component{//IT IS USED IN SearchBox.js

    render(){
        console.log('this.props.results from SearchResults.jsx', this.props.results)


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

    }
}
export default SearchResults;
