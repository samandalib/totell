import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NavBar extends Component{

    constructor(props){
      super(props)
      this.state = {activeUser:""};
    }

    getActiveUser(){
        fetch('/getuserinfo')
            .then(res=> res.json())
            .then(data => {
                this.setState({activeUser:data.username}, ()=>console.log(`Data from getActiveUser in NavBar: ${this.state.activeUser}`))
            })
    }

    componentDidMount(){
      this.getActiveUser()
    }
    render(){


      if (this.state.activeUser){
        let userProfile=`/regprofile/${this.state.activeUser}`
        return (

            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{position:"fixed", backgroundColor:"#ffffff", top: "0", left: "0", zIndex: "9999", width: "100%"}} >
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <Link to={'/'}>
                      <h2 className="navbar-brand" id="smalltotell">TOTELL</h2>
                  </Link>
                      <h6 id="wlcm">{this.state.activeUser.toUpperCase()}</h6>
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
      else if (!this.state.activeUser){
        return(
          <div>
              <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{position:"fixed", backgroundColor:"#ffffff", top: "0", left: "0", zIndex: "9999", width: "100%"}} >
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <Link to={'/'}>
                    <h2 className="navbar-brand" id="smalltotell">TOTELL</h2>
                  </Link>

                    <h6 id="wlcm">Welcome</h6>
                </div>

                <form className="form-inline my-2 my-lg-0" id="login" action="/login" method="POST">
                  <Link to={'/login'}>
                      <button className="btn btn-primary" >Log In </button>
                  </Link>

                  <Link to={'/signup'}>
                      <button className="btn btn-primary" >Sign Up </button>
                  </Link>
                </form>


              </nav>
          </div>
        )

      }

    }
}

export default NavBar;
