import React, { Component } from 'react';
import { Switch, Route,Link } from 'react-router-dom'
import MyApp from './myApp'
import Beer from './components/Beer'

import './App.css';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import {connect} from 'react-redux';
import { firebaseApp } from './components/firebase';

class App extends Component {

    signOut() {
        const { history } = this.props;
        firebaseApp.auth().signOut();

    }
  render() {
    return (

          <nav className="navbar navbar-inverse navbar-static-top">
              <div className="container">
                <Link to={`/`} className="navbar-brand">
                  <span className="icon-bar"></span>Home Brewer</Link>
                  <div className="collapse navbar-collapse navbar-right" >

                      {this.props.user ? (<ul class="nav navbar-nav"><li className="nav-item" ><a href="#" className="nav-link" onClick={() => this.signOut()}>Sign Out</a></li></ul>) : (
                                  <ul class="nav navbar-nav"><li className="nav-item"><Link to={`/signin`} className="nav-link"> Sign In</Link></li>
                                      <li className = "nav-item"><Link to={`/signup`} className="nav-link">Sign Up</Link></li></ul>)

                          }

                  </div>
              </div>
          </nav>

      
    );
  }
}

function mapStateToProps(state){
    console.log('state',state);
    const {user} = state;
    return {user}

}
export default connect(mapStateToProps,null)(App);
