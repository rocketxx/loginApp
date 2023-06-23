// import { firebase } from '@react-native-firebase/database';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { firebase } from '../Firebase/firebase';
function WelcomeAdminScreen() {
    firebase.auth().signInWithEmailAndPassword("cane@gmail.com", "william")
    // firebase.auth().createUserWithEmailAndPassword("testmio@gmail.com","william");
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;
            console.log(uid)
            user.getIdTokenResult().then((idTokenResult) => {
                const customClaims = idTokenResult.claims;
                console.log(idTokenResult.token)
                // console.log("CLAIMS: ", customClaims["admin"])
            });
        } else {
            console.log("niente")
        }
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
            <Text>ADMIN!</Text>
        </View>
    );
}

export default WelcomeAdminScreen;

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