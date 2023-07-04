import { StatusBar } from 'expo-status-bar';

import BootScreen from './src/screens/Boot/BootScreen'
import AuthContextProvider from './src/store/auth-contenxt';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <BootScreen />
      </AuthContextProvider>
    </>
  );
}