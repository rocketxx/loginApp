import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, StyleSheet, View, Platform, Text } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';


import { Colors } from '../../constants/styles';
import FlatButton from '../ui/FlatButton';
import AuthForm from './AuthForm';
import Button from '../ui/Button';

function AuthContent({ isLogin, onAuthenticate, googleLoginHandler, appleLogin  }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.navigate('Signup'); //se metti replacd anzichè navigate toglie la freccia indietro
    } else {
      navigation.navigate('Login');
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? 'Registrati' : 'Accedi'}
        </FlatButton>
      </View>
      
      <Text style={styles.text} >OR</Text>
      <View style={styles.buttons}>
        <Button onPress={googleLoginHandler}>
          Google Sign In
        </Button>
      </View>
      {
        Platform.OS === 'ios' && 
        <View style={styles.buttons}>
        <Button onPress={appleLogin}>
          Apple Sign In
        </Button>
      </View>
      }
      
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
  text:{
    alignSelf: 'center',
    color:"#FFF"
  }
});