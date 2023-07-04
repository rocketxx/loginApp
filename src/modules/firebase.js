// import * as firebase from "firebase/app";
import firebase from "firebase/compat/app";

import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAFd8IMfj5mXE8GcexS8w5HkBGATVi1ZwQ",
    authDomain: "corso-21f10.firebaseapp.com",
    projectId: "corso-21f10",
    storageBucket: "corso-21f10.appspot.com",
    messagingSenderId: "877363979356",
    appId: "1:877363979356:web:43061a993e0a9f77507299",
    measurementId: "G-88NVPZHTH7"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export { firebase }

