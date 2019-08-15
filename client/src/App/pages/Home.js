import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import SearchBox from './SearchBox.js';

class Home extends Component {
    render(){
        /*
        <div style={{backgroundColor:"blue", width:"100%"}}>
          <SearchBox />
        </div>
        */
        return(
            <div>

              <div className="container" style={{marginTop:"10%"}} >
                  <div className="grid">

                        <div id="main-title" >TOTELL</div>

                        <div id="slogan">EXPERIENCE A WORLD WITHOUT BORDERS </div>

                        <div id="homebtns">

                            <Link to={'/login'}>
                                <button className="btn btn-primary" id="loginbutHome">Log In </button>
                            </Link>

                            <Link to={'/signup'}>
                                <button className="btn btn-primary" id="signupbutHome">Sign Up </button>
                            </Link>

                        </div>


                  </div>
              </div>


            </div>
        );
    }
}

export default Home;
