import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-contenxt";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useState(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try{
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    }
    catch(error)
    {
      Alert.alert("Errore durante la registrazione... riprova")
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creazione utente..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;