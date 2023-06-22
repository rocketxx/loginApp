// import { firebase } from '@react-native-firebase/database';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { firebase } from '../Firebase/firebase';

function WelcomeScreen() {
  [user,setUser] = useState([]);
  // const todo = firebase.firestore().collection('todos').doc("LWmqBEQ7kGOLNdDK3SuR");
  const todo = firebase.firestore().collection('courses').doc("1PH2cOgGfGZEHqRuZO18");
  const users = {}
////lettura
  todo.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

//scrittura
// firebase.auth().setc
// const todo2 = firebase.firestore().collection('todos').doc("LWmqBEQ7kGOLNdDK3SuR").set({
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA"
// })
// .then(() => {
//   console.log("Document successfully written!");
// })
// .catch((error) => {
//   console.error("Error writing document: ", error);
// });
//

  return (
    <View style={styles.rootContainer}>
      {/* <FlatList
        data={users}
        numColumns={1}
        renderItem={({item}) =>(
          <Pressable>
            <View>
              <Text>{item.text1}</Text>
            </View>
          </Pressable>
        )}
      ></FlatList> */}
      <Text style={styles.title}>Benvenuto!</Text>
      <Text>Utente!</Text>
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