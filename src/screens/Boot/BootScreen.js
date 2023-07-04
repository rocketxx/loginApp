import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import jwt_decode from "jwt-decode";
import { useContext, useEffect, useState } from 'react';
import { Text } from 'react-native';

import IconButton from '../../components/ui/IconButton';
import { Colors } from '../../constants/styles';
import AuthContextProvider, { AuthContext } from '../../store/auth-contenxt';
import LoginScreen from '../AuthenticationScreens/LoginScreen';
import SignupScreen from '../AuthenticationScreens/SignupScreen';
import WelcomeAdminScreen from '../AuthenticationScreens/WelcomeAdminScreen';
import WelcomeScreen from '../AuthenticationScreens/WelcomeScreen';

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
                    onPress={authCtx.logout}
                />),
            }} />
        </Stack.Navigator>
    );
}
function RBAC_system() {
    const authCtx = useContext(AuthContext);
    if (!authCtx.isAuthenticated)
        return <AuthStack></AuthStack>
    else if (authCtx.isAuthenticated && authCtx.isAdmin)
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

function Root() {
    const authCtx = useContext(AuthContext);


    const [isTryingLogin, setIsTryingLogin] = useState(true);
    useEffect(() => {
        async function fetchToken() {
            const storedToken = await AsyncStorage.getItem('token'); //utilizzato per memorizzare info sul dispositivo
            if (storedToken) {
                var decoded = jwt_decode(storedToken);
                var isAdmin = decoded["admin"]
                if (isAdmin != undefined)
                    authCtx.setAdmin();
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
            <Root />
        </>
    );
}