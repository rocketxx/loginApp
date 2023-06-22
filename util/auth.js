import axios from 'axios';
import { firebase } from '../Firebase/firebase';

const API_KEY = 'AIzaSyAFd8IMfj5mXE8GcexS8w5HkBGATVi1ZwQ'

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
// console.log(response)
  const token = response.data.idToken;
  return token;
}



export async function createUser(email, password) {
  return await authenticate('signUp', email, password);
}

export async function login(email, password) {
  return await authenticate('signInWithPassword', email, password);
}