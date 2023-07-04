import { useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../../components/Auth/AuthContent";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { AuthContext } from "../../store/auth-contenxt";
import { createUser } from "../../util/auth";

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
      Alert.alert("Errore durante la registrazione... Riprova")
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creazione utente..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;