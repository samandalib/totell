import React, {Component} from 'react';
import {Link} from 'react-router-dom';

/*
import '../bootstrap/bootstrap.css';

*/

const style={
    backgroundColor:'black'
}
class Login extends Component{
    constructor(props){
        super(props)
        this.state = {username:'', password:''}
        this.handleChange= this.handleChange.bind(this)

    }
    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    render(){
        return(
            <div>
                <div className="container" >
                    <div id="main-title">TOTELL</div>
                </div>
                <div id="loginform">
                    <form action='/login' method='POST'>

                        <div className="container"  >
                            <div className="grid">

                                <div className="row">
                                    <div className= "col-lg-3">
                                    </div>
                                    <div className= "col-lg-6 col-sm-12">
                                        <div className="form-group">
                                            <label> Username:</label>
                                            <input className ="form-control" id="exampleInputEmail1" type='text' name='username' onChange={this.handleChange} value={this.state.username} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className= "col-lg-3">
                                    </div>
                                    <div className= "col-lg-6 col-sm-12">
                                        <div className="form-group">
                                            <label>Password:</label>
                                            <input className="form-control" id="exampleInputPassword1" type='password' name='password' onChange={this.handleChange} value={this.state.password} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className= "col-lg-3">
                                    </div>
                                    <div className= "col-lg-6 col-sm-12">
                                            <button className="btn btn-primary" type='submit' id="loginbut">Login</button>
                                        <Link to='/signup'>
                                            <button className="btn btn-primary" id="sigupbut">Sign Up </button>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;
