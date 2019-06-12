import React, {Component} from 'react';
import {Link} from 'react-router-dom';

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
                <form action='/login' method='POST'>
                    <label>
                    Username:
                    <input type='text' name='username' onChange={this.handleChange} value={this.state.username} />
                    </label>
                    <label>
                    Password:
                    <input type='password' name='password' onChange={this.handleChange} value={this.state.password} />
                    </label>
                    <input type='submit' value='Login' />
                </form>
                <Link to='/signup'>
                    <button type='button'>Sign Up </button>
                </Link>
            </div>
        )
    }
}

export default Login;
