import React, { useEffect } from "react";
import { KeyboardAvoidingView } from "react-native";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import AuthButton from "../components/auth/AuthButton";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit, setValue } = useForm();

  const onValid = (data) => {
    console.log(data);
  };
  useEffect(() => {
    register("username");
    register("password");
  }, [register]);

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
          autoCapitalize={"none"}
          placeholderTextColor={"gray"}
          onChangeText={(text) => setValue("username", text)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          returnKeyType="done"
          placeholderTextColor={"gray"}
          lastOne={true}
          onSubmitEditing={handleSubmit(onValid)}
          onChangeText={(text) => setValue("password", text)}
        />
      </KeyboardAvoidingView>
      <AuthButton
        text={"Login"}
        disabled={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
