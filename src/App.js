import React, { Component } from 'react';
import { Switch, Route,Link } from 'react-router-dom'
import MyApp from './myApp'
import Beer from './components/Beer'

import './App.css';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

class App extends Component {

  render() {
    return (
      <div className="App">
          <nav className="navbar navbar-inverse navbar-static-top">
              <div className="container">
                <Link to={`/`} className="navbar-brand">
                  <span className="icon-bar"></span>Home Brewer</Link>
                  <Link to={`/signin`} className="nav-link">
                      <span className="icon-bar"></span>Sign In</Link>

              </div>
          </nav>

          <Switch>
              <Route exact path='/' component={MyApp}/>
              <Route path='/beer/:beerId' component={Beer}/>
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
          </Switch>
      </div>
    );
  }
}

export default App;
