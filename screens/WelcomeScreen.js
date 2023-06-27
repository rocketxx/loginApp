// import { firebase } from '@react-native-firebase/database';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { FIREBASE_AUTH } from '../Firebase/firebase';
// import { firebase } from '../Firebase/firebase';
// import jwt_decode from "jwt-decode";
function WelcomeScreen() {
  const [userLogged, setUserLogged] = useState();

  const RenderEmail = () => {
    const user = FIREBASE_AUTH.currentUser;
    // console.log("UTENTE", user["email"])
    if (user)
      setUserLogged(user["email"]);
    else
      setUserLogged("Nessuna email");
  };

  useEffect(() => {
    RenderEmail(); // Chiamata alla funzione RenderEmail quando il componente si monta
  }, []); // Assicurati di passare un array vuoto come secondo argomento per eseguire la chiamata solo una volta

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Benvenuto UTENTE!</Text>
      <Text>Email: {userLogged}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});