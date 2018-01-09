import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers';
import { firebaseApp } from './components/firebase';
import { logUser } from './actions';
const store = createStore(reducer);
firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
        console.log('user has signed in or up', user);
        const { email } = user;
        store.dispatch(logUser(email));
    } else {
        console.log('user has signed out or still needs to sign in.')

    }
})
ReactDOM.render(
    <Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>
    , document.getElementById('root'));

registerServiceWorker();
