import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const Scroll = () => {
  const posts = useSelector((state) => state.posts);
  // console.log(`posts`, posts)
  console.log("In scroll");
  return (
    <View style={{ flex: 1, backgroundColor: "#DDDDDE" }}>
      <SafeAreaView style={{ flex: 1, margin: 5}}>
        {posts && (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              console.log("Inside Flat list with item", item);
              return (
                <View>
                  <Image source={{ uri: item.imageUrl }} resizeMode="contain" style={{ flex: 1, aspectRatio: 1, margin: 2 }} />
                </View>
              );
            }}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default Scroll;

const styles = StyleSheet.create({});
