import React, { Component }from 'react';
import {Route, Switch} from 'react-router-dom';

import './style.css';

import RestaurantForm from './pages/RestForm';
import RestShow from './pages/RestShow';
import Home from './pages/Home';


class App extends Component{
    render(){
        const App = ()=>(
            <div>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/restshow' component={RestShow} />
                    <Route path='/restform' component={RestaurantForm} />
                </Switch>
            </div>
        )
        return (
            <Switch>
                <App/>
            </Switch>
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
