import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';
import { async } from '@firebase/util';
const auths = null;
const API_KEY = 'AIzaSyAFd8IMfj5mXE8GcexS8w5HkBGATVi1ZwQ';

async function authenticate(mode, email, password) {
  const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  try {
    const response = await axios.post(endpoint, {
      email: email,
      password: password,
      returnSecureToken: true,
    })
    const idToken = response.data.idToken;
    const expiresIn = response.data.expiresIn;
    const expirationDate = new Date().getTime() + expiresIn * 1000;
    const userInfoResponse = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
      {
        idToken,
      }
    );
    const userInfo = userInfoResponse.data.users[0];

    await AsyncStorage.setItem('user', JSON.stringify(userInfo));
    await AsyncStorage.setItem('token', idToken);
    await AsyncStorage.setItem('expirationDate', expirationDate.toString());
    return idToken;
  } catch (error) {
    console.log("Login failed:", error.response.data.error.message);
    throw error;
  }
}


export async function onGoogleButtonPress() {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken, expiresIn } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    const user_sign_In = await auth().signInWithCredential(googleCredential);
    const res = user_sign_In.additionalUserInfo;
    const userInfo = res.profile;

    const expirationDate = new Date().getTime() + expiresIn * 1000;
    await AsyncStorage.setItem('user', JSON.stringify(userInfo));
    await AsyncStorage.setItem('token', idToken);
    await AsyncStorage.setItem('expirationDate', expirationDate.toString());

    return idToken;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function onAppleButtonPress() {
    try {
      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
  
      const { identityToken } = appleCredential;
      const provider = new firebase.auth.OAuthProvider('apple.com');
      const credential = provider.credential(identityToken);
  
      const userCredential = await firebase.auth().signInWithCredential(credential);
      const userInfo = userCredential.additionalUserInfo.profile;
  
      const expirationDate = new Date().getTime() + expiresIn * 1000;
      await AsyncStorage.setItem('user', JSON.stringify(userInfo));
      await AsyncStorage.setItem('token', identityToken);
      await AsyncStorage.setItem('expirationDate', expirationDate.toString());
  
      return identityToken;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  


async function firebase_auth(mode, email, password) {
  await signInWithEmailAndPassword(auths, email, password);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auths, async (user) => {
      if (user) {
        console.log("User is signed in:", user);
        await AsyncStorage.setItem('user', JSON.stringify(user));
      } else {
        console.log("User is signed out");
        await AsyncStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
  }, []);

  await onAuthStateChanged(auths, async (user) => {
    if (user) {
      console.log("User is signed in:", user);
      var uid = user.uid;
      const idTokenResult = await user.getIdTokenResult();
      const customClaims = idTokenResult.claims;
      // Perform any further actions with the user
    } else {
      console.log("User is signed out");
    }
  });
}

export async function createUser(email, password) {
  return await authenticate('signUp', email, password);
}

export async function login(email, password) {
  return await authenticate('signInWithPassword', email, password);
}

export async function checkAuthStatus() {
  const token = await AsyncStorage.getItem('token');
  const expirationDate = await AsyncStorage.getItem('expirationDate');
  if (!token || !expirationDate) {
    return false;
  }
  if (new Date().getTime() > parseInt(expirationDate)) {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('expirationDate');
    return false;
  }
  return true;
}

export async function getUserInfo() {
  const user = await AsyncStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}
