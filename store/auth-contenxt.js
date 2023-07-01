import { createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH } from "../Firebase/firebase";
export const AuthContext = createContext({
    user: '',
    isAuthenticated: false,
    isAdmin : false,
    setAdmin : (value) => { }, 
    authenticate: (user,adminClaims) => { },
    logout: () => { },
});

function AuthContextProvider({ children }) {
    const [authUser, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    async function authenticate(user,adminClaims) {
        // console.log(user)
        if(user)
        {
            setUser(JSON.stringify(user));
            // console.log("USER: ",user);
            await AsyncStorage.setItem('userLogged',JSON.stringify(user)); //firebase lo fa scadere dopo 1h, attento
            if(adminClaims)
            {
                await AsyncStorage.setItem('isAdmin','true');
                setIsAdmin(true)
    
            }
            else
            {
                await AsyncStorage.setItem('isAdmin','false');
                setIsAdmin(false)
            }
            // var mytmp = tmp.claims
            // console.log("CONTEXT_CLAIMS: ",mytmp)
            
        }
    }

    async function logout() {
        FIREBASE_AUTH.signOut()
        setUser(null);
        setIsAdmin(false)
        await AsyncStorage.removeItem('userLogged');
        await AsyncStorage.removeItem('isAdmin');
    }

    async function setAdmin(value)
    {
        setIsAdmin(value)
        // if(isAdmin)
        // await AsyncStorage.setItem('isAdmin','true');
        // else
        // await AsyncStorage.setItem('isAdmin','false');
        // console.log("miiii: ",isAdmin)
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