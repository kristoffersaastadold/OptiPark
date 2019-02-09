import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCz2Lbfoxu59bbPKz5GaWNczSvq_I0Uh_E",
    authDomain: "optipark-5dfe8.firebaseapp.com",
    databaseURL: "https://optipark-5dfe8.firebaseio.com",
    projectId: "optipark-5dfe8",
    storageBucket: "optipark-5dfe8.appspot.com",
    messagingSenderId: "887530230166"
}
firebase.initializeApp(config);
const databaseRef = firebase.database().ref();


export const auth = firebase.auth();
export const userRef = databaseRef.child("users");
export const geoRef = databaseRef.child("geo");