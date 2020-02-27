import React, { Component }from 'react';
import { render } from 'react-dom'
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

import './bootstrap/bootstrap.css';
import './bootstrap/bootstrap-grid.css';
import './bootstrap/bootstrap-reboot.css';
import './style.css';

import Home from './pages/Home';
import SignUp from './pages/SignUp.js';
import Login from './pages/Login.js';
import RglrProfile from './pages/RglrProfile.js';
import RestPageShow from './pages/RestPageShow.js';
import MenuShowPage from './pages/MenuShowPage.js';
import RestaurantForm from './pages/RestForm';
import MenuForm from './pages/MenuForm';


class App extends Component{
    render(){
        const App = ()=>(
            <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/login' component={Login} />
                    <Route path = '/regprofile/:user' component ={RglrProfile} />
                    <Route path='/restprofile/:restname/:zip' component={RestPageShow} />
                    <Route path='/menu/:restaurant/:zip' component = {MenuShowPage} />
                    <Route path='/restform' component={RestaurantForm} />
                    <Route path='/menuform/:restaurant/:zip' component = {MenuForm} />//To show the content of MenuForm Component based on params in the url
                    <Redirect from='/addrestaurant' to="/restform" />
                </Switch>
            </div>
            </BrowserRouter>
        )
        return (
                <App/>
        );
    }
}
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

export default App;
