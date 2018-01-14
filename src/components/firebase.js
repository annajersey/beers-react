import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAgrvv9me4jryPjaYkFrdY8BI_xBJwPl08",
    authDomain: "beers-694ed.firebaseapp.com",
    databaseURL: "https://beers-694ed.firebaseio.com",
    projectId: "beers-694ed",
    storageBucket: "",
    messagingSenderId: "983711723675"
};

export const firebaseApp = firebase.initializeApp(config);
export const favs = firebase.database().ref('favs');

