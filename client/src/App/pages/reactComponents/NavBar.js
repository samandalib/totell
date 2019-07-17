import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NavBar extends Component{
    render(){
        let userProfile=`/regprofile/${this.props.username}`
        return (

            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{position:"fixed", backgroundColor:"#ffffff", top: "0", left: "0", zIndex: "9999", width: "100%"}} >
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <h2 className="navbar-brand" id="smalltotell">TOTELL</h2>
                      <h6 id="wlcm">{this.props.username.toUpperCase()}</h6>
                  </div>

                  <Link to={userProfile}>
                    <button className="btn btn-primary" id="myprofile"> My Profile </button>
                  </Link>

                  <form className="form-inline my-2 my-lg-0" id="logoutform" action="/logout" method="POST">
                      <button className="btn btn-primary" id="logoutbut" type='submit'> Log out </button>
                  </form>


                </nav>
            </div>

        )
    }
}

export default NavBar;
