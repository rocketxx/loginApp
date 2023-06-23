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
          onPress={()=>{FIREBASE_AUTH.signOut()}} //FIREBASE_AUTH.signOut()
        />),
      }} />
    </Stack.Navigator>
  );
}
function RBAC_system()
{
  const [user,setUser] = useState();
  const [admin,setAdmin] = useState(false);
  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH,(user)=>{
      console.log("DENTRO RBAC");
      setUser(user)
      // console.log(user)
      //leggo token
      if(user)
      {
        user.getIdTokenResult().then((idTokenResult) => {
                     const customClaims = idTokenResult.claims;
                     //  idTokenResult.token
                     console.log("CLAIMS: ", customClaims["admin"])
                     if(customClaims["admin"])
                       setAdmin(customClaims["admin"])
                       else
                       setAdmin(false)
                 });
      }
    })
  },[])
  const authCtx = useContext(AuthContext);
  if(!user)
    return <AuthStack></AuthStack>
  else if(user && admin)
    return <AuthenticatedAdminStack />
  else
    return <AuthenticatedStack />
}
function Navigation() {
  return (
    <NavigationContainer>
      {RBAC_system()}
    </NavigationContainer>
  );
}

function Root()
{
  const authCtx = useContext(AuthContext);
  
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token'); //utilizzato per memorizzare info sul dispositivo
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    // console.log(firebase)
    
    // console.log(users);
    return (<Text>Attendi</Text>);
    // serve uno splashscreen: libreria già installata. lezione store authtoken, quello non va, deprecato 
  }
  return <Navigation />
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      {/* <AuthContextProvider> */}
      <Navigation />
      {/* </AuthContextProvider> */}
    </>
  );
}