import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView } from "react-native";
import firebase from 'firebase'

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const submitHandler = async () => {
    try {
      // console.log(`inside submitHandler`)
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
      // console.log(`userCredential`, userCredential)
      // console.log(`userCredential.user`, userCredential.user)
      await firebase.firestore().collection("users").doc(userCredential.user.uid).set({
        userName,
        email
      })
      // console.log(`Saved to Firebase`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView>
      <TextInput
        placeholder="username"
        onChangeText={(username) => setUserName(username)}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="email"
        onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"

      />
      <TextInput
        placeholder="password"
        onChangeText={(password) => setPassword(password)}
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <Button title="Sign Up" onPress={submitHandler}/>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
