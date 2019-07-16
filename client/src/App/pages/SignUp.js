import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import CountrySelector from './reactComponents/CountrySelector/selCountry.js';

class SignUp extends Component{
    constructor(props){
        super(props)
        this.state={username:'', password:'', email:'', country:'', membership:'regular'}
        this.handleChange = this.handleChange.bind(this)
        this.setCountry = this.setCountry.bind(this)
    }
    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    setCountry(c){
        this.setState({country:c})
    }
    render(){
        return(
            <div>
                <div className="container" >
                    <div id="main-title">TOTELL</div>
                </div>

                <div id="signupform">
                    <form action="/signup" method="POST">

                        <div className="container"  >
                            <div className="grid">

                            <div className="row">
                                <div className= "col-lg-3">
                                </div>

                                <div className= "col-lg-6 col-sm-12">
                                    <div className="form-group">
                                        <label>Username: </label>
                                        <input className ="form-control" type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className= "col-lg-3">
                                </div>
                                <div className= "col-lg-6 col-sm-12">
                                    <div className="form-group">
                                        <label>Password:</label>
                                        <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className= "col-lg-3">
                                </div>
                                <div className= "col-lg-6 col-sm-12">
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input className="form-control" id="exampleInputEmail1" type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className= "col-lg-3">
                                </div>
                                    <div className= "col-lg-6 col-sm-12">
                                        <div className="form-group">
                                            <label>Country:</label>
                                            <CountrySelector className="form-control" action={this.setCountry}/>
                                        </div>
                                    </div>
                            </div>

                            <div className="row">
                                <div className= "col-lg-3">
                                </div>
                                <div className= "col-lg-6 col-sm-12">
                                    <div className="form-group">
                                        <label>Membership Type:</label>
                                        <select className="form-control" name="membership" value={this.state.membership} onChange={this.handleChange} >
                                            <option value="regular">Regular Membership </option>
                                            <option value="premium">Premium Membership </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className= "col-lg-3">
                                </div>
                                <div className= "col-lg-6 col-sm-12">
                                    <input id="signupbut" className="btn btn-primary" type="submit" value="Submit" />
                                    <Link to='/login'>
                                        <button id="loginbut" className="btn btn-primary" type='button'>Login </button>
                                    </Link>
                                </div>
                            </div>

                            </div>
                        </div>

                    </form>

                </div>

            </div>

        );
    }

}

export default SignUp;
