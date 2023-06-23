import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default function Login({ navigation }) {
  return (
    <View>
      <Text>Welcome</Text>
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <View>
          <Text>Go to create Account</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
