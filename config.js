import firebase from 'firebase';
import 'firebase/app';
import 'firebase/auth';
require('firebase/auth');
require('firebase/app');


const firebaseConfig = {
    apiKey: "AIzaSyA3Fjt0ula9N12d_vaFNWER9bLUt5xUKQ0",
    authDomain: "project-85-spectagram.firebaseapp.com",
    databaseURL: "https://project-85-spectagram-default-rtdb.firebaseio.com",
    projectId: "project-85-spectagram",
    storageBucket: "project-85-spectagram.appspot.com",
    messagingSenderId: "1078569110540",
    appId: "1:1078569110540:web:4362a6dbd73d45997bf229"
  };


  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase.database()