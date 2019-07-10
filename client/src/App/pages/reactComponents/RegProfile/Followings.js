import React, {Component} from 'react';

import Waiting from '../Waiting.js';

class Followings extends Component{

    render(){
        /*
                        {this.state.restaurants.map( (i)=>{
                                    return <p>{i}</p>
                            })
                        }
        */
        if(this.props.data.length ==0 ){
            return (
                <div>
                    <h3>Following Restaruants</h3>
                    <p> No restaurant is followed </p>
                </div>
            )
        }else{
            return(
                <div>
                <h3>Following Restaruants</h3>
                <p> You are following {this.props.data.length} restaurnats </p>

                </div>

            )
        }

    }
}

export default Followings;
