import { createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH } from "../Firebase/firebase";
export const AuthContext = createContext({
    user: '',
    isAuthenticated: false,
    isAdmin : false,
    setAdmin : () => { }, 
    authenticate: (user,adminClaims) => { },
    logout: () => { },
});

function AuthContextProvider({ children }) {
    const [authUser, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    async function authenticate(user,adminClaims) {
        setUser(JSON.stringify(user));
        console.log("USER: ",user);
        await AsyncStorage.setItem('userLogged',JSON.stringify(user)); //firebase lo fa scadere dopo 1h, attento
        if(adminClaims)
        {
            await AsyncStorage.setItem('isAdmin','true');
            setAdmin(true)

        }
        else
        {
            await AsyncStorage.setItem('isAdmin','false');
            setAdmin(false)
        }
        // var mytmp = tmp.claims
        // console.log("CONTEXT_CLAIMS: ",mytmp)
    }

    function logout() {
        setAuthToken(null);
        setIsAdmin(false)
        AsyncStorage.removeItem('userLogged');
        AsyncStorage.removeItem('isAdmin');
    }

    async function setAdmin()
    {
        setIsAdmin(!isAdmin)
        if(isAdmin)
        await AsyncStorage.setItem('isAdmin','true');
        else
        await AsyncStorage.setItem('isAdmin','false');
        console.log("ADMIN: ",isAdmin)
    }

    const value = {
        user: authUser,
        isAuthenticated: !!authUser, //!!nome_var converte il valore in booleano. true se è pieno, altrim. se vuoto, stringaa vuota o null false
        isAdmin : isAdmin,
        authenticate: authenticate,
        logout: logout,
        setAdmin : setAdmin
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;