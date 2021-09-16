import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearPosts, getPostsThunk } from "../../../store/posts";
import { clearUser } from "../../../store/user";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Grid from "./Grid";
import Scroll from "./Scroll";

const Tab = createMaterialTopTabNavigator();

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(getPostsThunk());
    });
  }, []);
  // console.log(`user`, user);
  // console.log(`posts`, posts);

  const logout = async () => {
    dispatch(clearPosts());
    dispatch(clearUser());
    await firebase.auth().signOut();
  };

  const EmptyPage = () => <View/>

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>{user.userName}</Text>
        <TouchableOpacity onPress={logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 1, backgroundColor: "#DDDDDE" }} />
      <View style={{ flex: 3, backgroundColor: "#DDDDDE" }}>
        <Tab.Navigator initialRouteName="Grid">
          <Tab.Screen name="Grid" component={Grid}             options={{
              tabBarIcon: ({ color }) => (
                <Icon name="ios-grid-outline" color={color} size={25} />
              ),tabBarShowLabel: false
            }}/>
          <Tab.Screen
            name="ScrollTab"
            component={Scroll}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="albums-outline" color={color} size={26} />
              ),tabBarShowLabel: false
            }}
          />
        </Tab.Navigator>
      </View>

      {/* <View style={{ flex: 3, backgroundColor: "#DDDDDE" }}>
        {posts && (
          <FlatList
            data={posts}
            horizontal={false}
            numColumns={3}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flex: 1 / 3,
                  borderWidth: 3 / 4,
                  borderColor: "#DDDDDE",
                }}
                onPress={() =>
                  navigation.navigate("SingleImage", { image: item.imageUrl })
                }
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  resizeMode="cover"
                  style={{ flex: 1, aspectRatio: 1 }}
                />
              </TouchableOpacity>
            )}
          />
        )}
      </View> */}
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({});
