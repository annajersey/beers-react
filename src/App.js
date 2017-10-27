import React, { Component } from 'react';
import MyApp from './myApp'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <nav class="navbar navbar-inverse navbar-static-top">
              <a class="navbar-brand" href="#"><span class="icon-bar"></span>Home Brewer</a>
          </nav>

          <MyApp />
      </div>
    );
  }
}

export default App;
