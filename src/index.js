import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import myApp from './myApp';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route,Link } from 'react-router-dom'
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers';
import { firebaseApp } from './components/firebase';
import { logUser } from './actions';
import Beer from './components/Beer'


import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
const store = createStore(reducer);
firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
        console.log('user has signed in or up', user);
        const { email } = user;
        store.dispatch(logUser(email));
    } else {
        store.dispatch(logUser(0));
        console.log('user has signed out or still needs to sign in.')

    }
})
ReactDOM.render(
    <Provider store={store}><BrowserRouter>
        <div className="App">
            <App />
        <Switch>

            <Route exact path='/' component={myApp}/>
            <Route path='/beer/:beerId' component={Beer}/>
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />

        </Switch>
        </div>
    </BrowserRouter></Provider>
    , document.getElementById('root'));

registerServiceWorker();
