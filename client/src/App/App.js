import React, { Component }from 'react';
import { render } from 'react-dom'
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

import './style.css';

import RestaurantForm from './pages/RestForm';
import RestShow from './pages/RestShow';
import Home from './pages/Home';
import MenuForm from './pages/MenuForm';
import SearchBox from './pages/SearchBox.js';
import RestMenu from './pages/RestMenu.js';

class App extends Component{
    render(){
        const App = ()=>(
            <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/restshow' component={RestShow} />
                    <Route path='/restshow/:restname' component={RestMenu} />
                    <Route path='/restform' component={RestaurantForm} />
                    <Route path='/menuform' component = {MenuForm} />//To show the content of MenuForm Component based on params in the url
                    <Route exact path='/filter' component = {SearchBox} />
                    <Route path='/filter/:searchFilter' component = {SearchBox} />
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
