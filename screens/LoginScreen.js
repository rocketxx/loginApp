import AuthContent from "../components/Auth/AuthContent";
import { useContext, useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-contenxt";
import { FIREBASE_AUTH } from "../Firebase/firebase";
import { firebase } from "../Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);
  const auth = FIREBASE_AUTH;

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const response = await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
      Alert.alert(
        error.message
      );
    } finally{
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Accesso ..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;