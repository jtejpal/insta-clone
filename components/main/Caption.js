import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import firebase from "firebase";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Caption = (props) => {
  const image = props.route.params.image;
  const [caption, setCaption] = useState("");
  const navigation = useNavigation()

  const submitHandler = async () => {
    try {
      const postRef = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("posts")
        .add({ caption: caption });

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image.uri, true);
        xhr.send(null);
      });

      const postStorageRef = await firebase
        .storage()
        .ref()
        .child(`posts/${firebase.auth().currentUser.uid}/${postRef.id}`)
        .put(blob);
      blob.close();
      const downloadUrl = await postStorageRef.ref.getDownloadURL();
      const updatedPost = await postRef.update({
        imageUrl: downloadUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      navigation.navigate("Main", { screen: 'Profile' })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          source={{ uri: image.uri }}
          resizeMode={"contain"}
          style={{ flex: 4, margin: 5 }}
        />
        <View style={{ height: 1, backgroundColor: "#DDDDDF", margin: 5 }} />
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder="Enter a Caption"
            onChangeText={(val) => setCaption(val)}
            value={caption}
            onSubmitEditing={submitHandler}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Caption;

const styles = StyleSheet.create({});
