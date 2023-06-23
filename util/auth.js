import axios from 'axios';
import { firebase } from '../Firebase/firebase';
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useState } from 'react';
const auth = getAuth();


// const [user, setUser] = useState();
const API_KEY = 'AIzaSyAFd8IMfj5mXE8GcexS8w5HkBGATVi1ZwQ'

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  // return await firebase_auth("dsdssd",email,password);
  
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
// console.log(response)

  const token = response.data.idToken;
  return token;
}

async function firebase_auth(mode, email, password)
{
    await firebase.auth().signInWithEmailAndPassword(email, password)
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          console.log(user)
          // setUser(user);
        } else {
          // User is signed out
          console.log("noooooo")
          // setUser(undefined);
        }
      });
  
      return 0;
    }, []);
  //   // firebase.auth().createUserWithEmailAndPassword("testmio@gmail.com","william");
  //   await firebase.auth().onAuthStateChanged(async (user) => {
  //     if (user) {
  //         var uid = user.uid;
  //         // console.log(uid)
  //         user.getIdTokenResult().then((idTokenResult) => {
  //             const customClaims = idTokenResult.claims;
  //             return idTokenResult.token
  //             // console.log("CLAIMS: ", customClaims["admin"])
  //         });
  //     } else {
  //         console.log("niente")
  //     }
  // });
  
}

export async function createUser(email, password) {
  return await authenticate('signUp', email, password);
}

export async function login(email, password) {
  return await authenticate('signInWithPassword', email, password);
}