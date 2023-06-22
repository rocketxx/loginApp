import AuthContent from "../components/Auth/AuthContent";
import { useContext, useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../util/auth';
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-contenxt";
function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      // console.log(token);
      // token["admin"]
      // const role = JSON.parse(window.atob(token.split(".")[1])).role;
      console.log(role);

      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Autenticazione fallita!',
        'Perfavore ricontrolla le credenziali e riprova!'
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Accesso ..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;