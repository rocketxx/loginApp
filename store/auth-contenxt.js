import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token) => { },
    logout: () => { },
});

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();

    useEffect(() => {
        async function fetchToken(){

            const storedToken = await AsyncStorage.getItem('token');
            if(storedToken)
            {
                setAuthToken(storedToken);        
            }
        }
        fetchToken();
    }, []);

    function authenticate(token) {
        setAuthToken(token);
        AsyncStorage.setItem('token', token);
    }

    function logout() {
        setAuthToken(null);
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken, //!!nome_var converte il valore in booleano. true se è pieno, altrim. se vuoto, stringaa vuota o null false
        authenticate: authenticate,
        logout: logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;