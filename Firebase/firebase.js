// import * as firebase from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyChxKle96IkRbb_gYmtw_nitSoX3bWFqK0",
  authDomain: "login-b2e5a.firebaseapp.com",
  databaseURL: "https://login-b2e5a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "login-b2e5a",
  storageBucket: "login-b2e5a.appspot.com",
  messagingSenderId: "321134925191",
  appId: "1:321134925191:web:695b83ec8b7f9c1bcaaf22",
  measurementId: "G-78J7STZZB4"
};

if(!firebase.apps.length)
{
    firebase.initializeApp(firebaseConfig);
}

export {firebase}

