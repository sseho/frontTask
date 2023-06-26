import React, { useRef } from "react";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { KeyboardAvoidingView, Platform } from "react-native";
import { TextInput } from "../components/auth/AuthShared";

export default function CreateAccount() {
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onDone = () => {
    alert("done!");
  };
  return (
    <AuthLayout>
      <KeyboardAvoidingView
        disabled={Platform.OS === "ios" ? false : true}
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
        />
        <TextInput
          ref={lastNameRef}
          placeholder="Last Name"
          returnKeyType="next"
          placeholderTextColor={"gray"}
          onSubmitEditing={() => onNext(usernameRef)}
        />
        <TextInput
          ref={usernameRef}
          placeholder="Username"
          returnKeyType="next"
          placeholderTextColor={"gray"}
          onSubmitEditing={() => onNext(emailRef)}
        />
        <TextInput
          ref={emailRef}
          placeholder="Email"
          returnKeyType="next"
          placeholderTextColor={"gray"}
          keyboardType="email-address"
          onSubmitEditing={() => onNext(passwordRef)}
        />
        <TextInput
          ref={passwordRef}
          placeholder="Password"
          secureTextEntry
          returnKeyType="done"
          placeholderTextColor={"gray"}
          onSubmitEditing={onDone}
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
