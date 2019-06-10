import React , {Component} from 'react';
import { Link } from 'react-router-dom';

import RestInfo from '../RestInfo.js';

class SearchResults extends Component{
    constructor(props){
        super(props)
        this.results = this.props.results

    }


    render(){
        console.log('from SearchResults.jsx', this.props.results)
        console.log('this.props.results', this.props.results)
        return(
            <div>
                {this.props.results.map((r)=> {
                    console.log('r is: ',r)
                    let path = `restshow/${r.name}`
                    console.log('path to link is:', path)
                    return(
                    <Link to={path}>//IT DOES NOT WORK
                        <RestInfo name={r.name} state ={r.state} city={r.city} address={r.address} zip={r.zip} />
                    </Link>
                    )
                    })
                }
            </div>
        )
    }
}
export default SearchResults;
