import { StatusBar } from 'expo-status-bar';

import BootScreen from './src/screens/Boot/BootScreen'
import AuthContextProvider from './src/store/auth-contenxt';
import 'expo-dev-client';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {firebase} from './src/util/auth'
export default function App() {
  GoogleSignin.configure({
    webClientId: '877363979356-qgl37bnp155ekm0319lns5nff29fsc9k.apps.googleusercontent.com',
  });
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <BootScreen />
      </AuthContextProvider>
    </>
  );
}