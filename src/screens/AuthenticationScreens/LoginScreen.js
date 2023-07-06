import jwt_decode from "jwt-decode";
import { useContext, useState } from 'react';
import { Alert } from "react-native";

import AuthContent from "../../components/Auth/AuthContent";
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import { AuthContext } from "../../store/auth-contenxt";
import { login, onAppleButtonPress, onGoogleButtonPress } from '../../util/auth';
import { async } from "@firebase/util";

function LoginScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const authCtx = useContext(AuthContext);

    async function loginHandler({ email, password }) {
        setIsAuthenticating(true);
        try {
            const token = await login(email, password)
            var decoded = jwt_decode(token);
            var isAdmin = decoded["admin"]
            if (isAdmin != undefined)
                authCtx.setAdmin();

            authCtx.authenticate(token);
        } catch (error) {
            Alert.alert(
                'Autenticazione fallita!',
                'Perfavore ricontrolla le credenziali e riprova!'
            );
            setIsAuthenticating(false);
        }
    }
    async function GoogleLoginHandler() {
        setIsAuthenticating(true);
        await onGoogleButtonPress().then((token)=>{
            try {
                var decoded = jwt_decode(token);
                var isAdmin = decoded["admin"]
                if (isAdmin != undefined)
                    authCtx.setAdmin();
    
                authCtx.authenticate(token);
            } catch (error) {
                Alert.alert(
                    'Autenticazione fallita!',
                    'Perfavore ricontrolla le credenziali e riprova!'
                );
                setIsAuthenticating(false);
            }
        })
    }

    async function AppleLogin(){
        console.log('herre')
        setIsAuthenticating(true);
        await onAppleButtonPress().then((token)=>{
            try {
                var decoded = jwt_decode(token);
                var isAdmin = decoded["admin"]
                if (isAdmin != undefined)
                    authCtx.setAdmin();
    
                authCtx.authenticate(token);
            } catch (error) {
                Alert.alert(
                    'Autenticazione fallita!',
                    'Perfavore ricontrolla le credenziali e riprova!'
                );
                setIsAuthenticating(false);
            }
        })
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Accesso ..." />;
    }

    return <AuthContent isLogin onAuthenticate={loginHandler} googleLoginHandler={GoogleLoginHandler} appleLogin={AppleLogin} />;
}

export default LoginScreen;