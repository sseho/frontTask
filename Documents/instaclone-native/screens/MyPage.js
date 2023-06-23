import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default function MyPage({ navigation }) {
  return (
    <View>
      <Text>Welcome</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Follower")}>
        <View>
          <Text>팔로워</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Following")}>
        <View>
          <Text>팔로잉</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
