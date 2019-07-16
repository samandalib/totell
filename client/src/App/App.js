import React, { Component }from 'react';
import { render } from 'react-dom'
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

import './bootstrap/bootstrap.css';
import './style.css';

import RestaurantForm from './pages/RestForm';
import RestShow from './pages/RestShow';
import Home from './pages/Home';
import MenuForm from './pages/MenuForm';
import SearchBox from './pages/SearchBox.js';
import RestMenu from './pages/reactComponents/RestMenu.js';
import SignUp from './pages/SignUp.js';
import Login from './pages/Login.js';
import SearchForm from './pages/reactComponents/SearchPage/SearchForm.jsx';
import SearchResults from './pages/reactComponents/SearchPage/SearchResults.jsx';
import MenuShowPage from './pages/MenuShowPage.js';
import RestPageShow from './pages/RestPageShow.js';
import RglrProfile from './pages/RglrProfile.js';

class App extends Component{
    render(){
        const App = ()=>(
            <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/login' component={Login} />
                    <Route path = '/regprofile/:user' component ={RglrProfile} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/restprofile/:restname/:zip' component={RestPageShow} />
                    <Route exact path='/restshow' component={RestShow} />
                    <Route path='/restshow/:restname' component={RestMenu} />
                    <Route path='/restform' component={RestaurantForm} />
                    <Route path='/menuform/:restaurant/:zip' component = {MenuForm} />//To show the content of MenuForm Component based on params in the url
                    <Route path='/search' component = {SearchBox} />
                    <Route path='/searchresult' component = {SearchResults} />
                    <Route path='/menu/:restaurant/:zip' component = {MenuShowPage} />
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
