import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView } from "react-native";
import firebase from 'firebase'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    try {
      // console.log(`inside submitHandler`)
      const userCredential = firebase.auth().signInWithEmailAndPassword(email, password)
      // console.log(`userCredential`, userCredential)
      // console.log(`userCredential.user`, userCredential.user)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView>
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
      <Button title="Login" onPress={submitHandler}/>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
