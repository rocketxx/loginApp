import { StatusBar } from 'expo-status-bar';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthContextProvider, { AuthContext } from './store/auth-contenxt';
import { useContext, useEffect, useState } from 'react';
import IconButton from './components/ui/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { Text } from 'react-native';
import WelcomeAdminScreen from './screens/WelcomeAdminScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './Firebase/firebase';
// import { firebase } from "./Firebase/firebase";
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight: ({ tintColor }) => (<IconButton
          icon="exit"
          color={tintColor}
          size={24}
          onPress={authCtx.logout}
        />),
      }} />
    </Stack.Navigator>
  );
}


function AuthenticatedAdminStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeAdminScreen} options={{
        headerRight: ({ tintColor }) => (<IconButton
          icon="exit"
          color={tintColor}
          size={24}
          onPress={authCtx.logout} //FIREBASE_AUTH.signOut()
        />),
      }} />
    </Stack.Navigator>
  );
}
function RBAC_system() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const checkUser = async () => {
      const storedToken = await AsyncStorage.getItem('userLogged');
      const storedClaims = await AsyncStorage.getItem('isAdmin');

      if (storedToken) {
        const idTokenResult = { claims: { admin: storedClaims === 'true' } };
        if(storedClaims === 'true' )
        authCtx.authenticate(storedToken,true);
        else 
        authCtx.authenticate(storedToken,false); 
        setUser({ getIdTokenResult: () => Promise.resolve(idTokenResult) });
        setAdmin(storedClaims === 'true'); //risultato di espressione setta a true o false. dunque va come param. della funzione
        authCtx.setAdmin(storedClaims === 'true')
      } else {
        onAuthStateChanged(FIREBASE_AUTH, async (user) => {
          setUser(user);

          if (user) {
            const idTokenResult = await user.getIdTokenResult();
            const customClaims = idTokenResult.claims;

            if (customClaims["admin"]) {
              setAdmin(true);
              authCtx.setAdmin(true)
            } else {
              setAdmin(false);
              authCtx.setAdmin(false)
            }

            authCtx.authenticate(idTokenResult, customClaims["admin"]);
            AsyncStorage.setItem('userLogged', idTokenResult.token);
            if(customClaims["admin"]!=undefined || customClaims["admin"]!=null )
            AsyncStorage.setItem('isAdmin', customClaims["admin"].toString());
          }
        });
      }
    };

    checkUser();
    console.log(authCtx.isAuthenticated)
    console.log(authCtx.isAdmin)
  }, []);

  if (!authCtx.isAuthenticated) {
    return <AuthStack />;
  } else if (authCtx.isAuthenticated && authCtx.isAdmin) {
    return <AuthenticatedAdminStack />;
  } else {
    return <AuthenticatedStack />;
  }
}
function Navigation() {
  return (
    <NavigationContainer>
      {RBAC_system()}
    </NavigationContainer>
  );
}


export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
      <Navigation />
      </AuthContextProvider>
    </>
  );
}