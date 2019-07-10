import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
    render(){
        return(
            <div>
                <h1>Welcome to MenuApp</h1>
                <Link to={'/login'}>
                    <button>Log In </button>
                </Link>
                <Link to={'/signup'}>
                    <button>Sign Up </button>
                </Link>
            </div>
        );
    }
}

export default Home;
