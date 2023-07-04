import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState } from "react";

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    isAdmin: false,
    setAdmin: () => { },
    authenticate: (token) => { },
    logout: () => { },
});

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();
    const [isAdmin, setIsAdmin] = useState();

    function authenticate(token) {
        setAuthToken(token);
        console.log(token)
        AsyncStorage.setItem('token', token); //firebase lo fa scadere dopo 1h, attento
    }

    function logout() {
        setAuthToken(null);
        setIsAdmin(false)
        AsyncStorage.removeItem('token');
    }

    function setAdmin() {
        setIsAdmin(!isAdmin)
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken, //!!nome_var converte il valore in booleano. true se è pieno, altrim. se vuoto, stringaa vuota o null false
        isAdmin: !!isAdmin,
        authenticate: authenticate,
        logout: logout,
        setAdmin: setAdmin
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;