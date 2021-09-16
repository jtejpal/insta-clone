import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const Grid = () => {
  const posts = useSelector((state) => state.posts);
  const navigation = useNavigation();


  return (
    // <View style={{ flex: 3, backgroundColor: "#DDDDDE" }}>
    <>
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
    </>
    // </View>
  );
};

export default Grid;

const styles = StyleSheet.create({});
