import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { KeyboardAvoidingView, Platform } from "react-native";
import { TextInput } from "../components/auth/AuthShared";
import { useForm } from "react-hook-form";

export default function CreateAccount() {
  const { register, handleSubmit, setValue } = useForm();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onValid = (data) => {
    console.log(data);
  };

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  useEffect(() => {
    register("firstname");
    register("lastname");
    register("username");
    register("email");
    register("password");
  }, [register]);
  return (
    <AuthLayout>
      <KeyboardAvoidingView
        disabled={Platform.OS === "android"}
        style={{ width: "100%" }}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
      >
        <TextInput
          autoFocus
          placeholder="First Name"
          returnKeyType="next"
          placeholderTextColor={"gray"}
          onSubmitEditing={() => onNext(lastNameRef)}
          onChangeText={(text) => setValue("firstname", text)}
        />
        <TextInput
          ref={lastNameRef}
          placeholder="Last Name"
          returnKeyType="next"
          placeholderTextColor={"gray"}
          onSubmitEditing={() => onNext(usernameRef)}
          onChangeText={(text) => setValue("lastname", text)}
        />
        <TextInput
          ref={usernameRef}
          placeholder="Username"
          returnKeyType="next"
          autoCapitalize={"none"}
          placeholderTextColor={"gray"}
          onSubmitEditing={() => onNext(emailRef)}
          onChangeText={(text) => setValue("username", text)}
        />
        <TextInput
          ref={emailRef}
          placeholder="Email"
          returnKeyType="next"
          autoCapitalize={"none"}
          placeholderTextColor={"gray"}
          keyboardType="email-address"
          onSubmitEditing={() => onNext(passwordRef)}
          onChangeText={(text) => setValue("email", text)}
        />
        <TextInput
          ref={passwordRef}
          placeholder="Password"
          secureTextEntry
          returnKeyType="done"
          placeholderTextColor={"gray"}
          onSubmitEditing={handleSubmit(onValid)}
          onChangeText={(text) => setValue("password", text)}
          lastOne={true}
        />
        <AuthButton
          text="Create Account"
          disabled={true}
          onPress={() => null}
        />
      </KeyboardAvoidingView>
    </AuthLayout>
  );
}
