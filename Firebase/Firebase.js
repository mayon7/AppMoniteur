import firebase from 'firebase' 

const config = { 
    apiKey: "AIzaSyCPuxSbE2T8_TOSJiRfkoIJAsQ4S5YCawc",
    authDomain: "mon-moniteur-fr.firebaseapp.com",
    databaseURL: "https://mon-moniteur-fr.firebaseio.com",
    projectId: "mon-moniteur-fr",
    storageBucket: "mon-moniteur-fr.appspot.com",
    messagingSenderId: "488662838568"
}; 

firebase.initializeApp(config); 

export const db = firebase.database() 
export const auth = firebase.auth() 
export const fb = firebase