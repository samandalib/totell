import React , {Component} from 'react';
import { Link } from 'react-router-dom';

import RestInfo from '../RestInfo.js';
import Restaurant from '../Restaurant.js';

class SearchResults extends Component{//IT IS USED IN SearchBox.js
    constructor(props){
        super(props)
        this.state={displayAll:1, selectedItem:{}}
        this.results = this.props.results
        this.handleClick = this.handleClick.bind(this)

    }
    handleClick(obj){

        if (this.state.displayAll==1){

            console.log('Selected Object is: ', obj)
            this.setState({displayAll:0, selectedItem:obj})

        } else if (this.state.displayAll==0){
            this.setState({displayyAll:1, selectedItem:{}})
        }

    }


    render(){
        console.log('from SearchResults.jsx', this.props.results)
        console.log('this.props.results', this.props.results)
        console.log('displayAll Value: ', this.state.displayAll)
        //
        if (this.state.displayAll==1){
            return(
                <div>
                    {this.props.results.map((r)=> {
                        console.log('r is: ',r)
/*
                        let path = `restshow/${r.name}`
                        console.log('path to link is:', path)
*/
                        return(
                            <div>
                                <RestInfo   action={this.handleClick(r)} name={r.name} state ={r.state} city={r.city} address={r.address} zip={r.zip} />
                            </div>
                        )
                    })
                    }
                </div>
            )
        } else if (this.state.displayAll ==0){
            return(
                <Restaurant {...this.state.selectedItem} />
            )
        }

    }
}
export default SearchResults;
