import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-contenxt";
import { createUserWithEmailAndPassword, signInWithCredential } from "firebase/auth";
import { FIREBASE_AUTH } from "../Firebase/firebase";
function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useState(AuthContext);
  const auth = FIREBASE_AUTH;
  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const response = await createUserWithEmailAndPassword(auth,email,password);
      console.log(response);
    } catch (error) {
      Alert.alert(
        'Registrazione fallita!'
      );
    } finally{
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creazione utente..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;