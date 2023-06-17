import axios from 'axios';

const API_KEY = 'AIzaSyChxKle96IkRbb_gYmtw_nitSoX3bWFqK0'

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

// export async function createUser(email, password) {
//   const response = await axios.post(
//     'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY,
//     {
//       email: email,
//       password: password,
//       returnSecureToken: true
//     }
//   );
// }

export async function createUser(email, password) {
  return await authenticate('signUp', email, password);
}

export async function login(email, password) {
  return await authenticate('signInWithPassword', email, password);
}