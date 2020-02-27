import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import SearchBox from './SearchBox.js';
import NavBar from './reactComponents/NavBar.js';

class Home extends Component {
    render(){
        /*
        <div style={{backgroundColor:"blue", width:"100%"}}>
          <SearchBox />
        </div>
        */
        return(
            <div>
              <NavBar/>

              <div className="container" style={{marginTop:"10%"}} >
                  <div className="grid">

                        <div id="main-title" >TOTELL</div>

                        <div id="slogan">EXPERIENCE A WORLD WITHOUT BORDERS </div>


                  </div>
              </div>

              <SearchBox/>


            </div>
        );
    }
}

export default Home;
