import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Button,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const AddPage = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [caption, setCaption] = useState('')
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef();
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    try {
      if (camera) {
        let photo = await camera.takePictureAsync({exif: true});
        // setPhoto(photo.uri);
        // navigation.navigate("Caption", {image: photo.uri})
        navigation.navigate("Caption", {image: photo})


      }
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      // setImage(result.uri);
      // navigation.navigate("Caption", {image: result.uri})
      navigation.navigate("Caption", {image: result})
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      {/* {image && (
        <ImageBackground
          source={{ uri: image.uri }}
          resizeMode="contain"
          style={{ flex: 1, backgroundColor: "black" }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setImage(null)}
              style={styles.buttonCancel}
            >
              <Icon name="close-outline" size={42} color={"white"} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
      {photo && (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding': 'height'} style={[styles.buttonContainer, {flexDirection: 'column', margin: 45}]}>
            <Image source={{ uri: photo, }} resizeMode="contain" style={{ flex: 3 }}  />
          <TouchableOpacity
            onPress={() => setPhoto(null)}
            style={styles.buttonCancel}
          >
            <Icon name="close-outline" size={42} color={"white"} />
          </TouchableOpacity>
          <View style={{height: 1, backgroundColor: '#DDDDDF', margin: 5}}/>
          <View style={{flex: 1}}>
            <TextInput
            placeholder='Enter a Caption'
            onChangeText={(val) => setCaption(val)}
            value={caption}
            />
          </View>
        </KeyboardAvoidingView>
      )} */}
      {!photo && !image && (
        <Camera
          style={styles.camera}
          ref={(ref) => {
            setCamera(ref);
          }}
          type={type}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.buttonCancel}
            >
              <Icon name="close-outline" size={42} color={"white"} />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonFlip}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Icon name="camera-reverse" size={48} color={"white"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonCamera}
              onPress={() => {
                takePicture();
              }}
            >
              <Icon name="ellipse-outline" size={100} color={"white"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRoll} onPress={pickImage}>
              <Icon name="images-outline" size={48} color={"white"} />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
};

export default AddPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  buttonFlip: {
    flex: 1,
    alignSelf: "flex-end",
    paddingVertical: 15,
    marginVertical: 15,
    alignItems: "center",
  },
  buttonCamera: {
    flex: 2,
    alignSelf: "flex-end",
    paddingVertical: 15,
    marginVertical: 15,
    alignItems: "center",
  },
  buttonRoll: {
    flex: 1,
    alignSelf: "flex-end",
    paddingVertical: 15,
    marginVertical: 15,
    alignItems: "center",
  },
  buttonCancel: {
    flex: 1,
    alignSelf: "flex-start",
    paddingTop: 25,
  },
});
