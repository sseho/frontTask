import React from "react";
import { KeyboardAvoidingView } from "react-native";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

export default function Login({ navigation }) {
  return (
    <AuthLayout>
      <KeyboardAvoidingView
        style={{ width: "100%" }}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
      >
        <TextInput
          placeholder="Username"
          returnKeyType="next"
          placeholderTextColor={"gray"}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          returnKeyType="done"
          placeholderTextColor={"gray"}
          lastOne={true}
        />
      </KeyboardAvoidingView>
    </AuthLayout>
  );
}
