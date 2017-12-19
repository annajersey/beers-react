import React, { Component } from 'react';
import { Switch, Route,Link } from 'react-router-dom'
import MyApp from './myApp'
import Beer from './components/Beer'

import './App.css';
const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={MyApp}/>
            <Route path='/beer/:beerId' component={Beer}/>
        </Switch>
    </main>
)
class App extends Component {

  render() {
    return (
      <div className="App">
          <nav className="navbar navbar-inverse navbar-static-top">
              <div className="container">
                <Link to={`/`} className="navbar-brand">
                  <span className="icon-bar"></span>Home Brewer</Link>

              </div>
          </nav>

          <Main />
      </div>
    );
  }
}

export default App;
