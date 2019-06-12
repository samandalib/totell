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
                <form action="/usereg" method="POST">
                    <label>
                        Username:
                        <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </label>
                    <label>
                        Country:
                        <CountrySelector action={this.setCountry}/>
                    </label>
                    <label>
                        Membership Type:
                        <select name="membership" value={this.state.membership} onChange={this.handleChange} >
                            <option value="regular">Regular Membership </option>
                            <option value="premium">Premium Membership </option>
                        </select>
                    </label>

                    <input type="submit" value="Submit" />
                </form>
                <Link to='/login'>
                    <button type='button'>Login </button>
                </Link>
            </div>

        );
    }

}

export default SignUp;
