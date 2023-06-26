import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import CreateAccount from "../screens/CreateAccount";
import MyPage from "../screens/MyPage";
import Follower from "../screens/Follower";
import Following from "../screens/Following";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Welcome"
        options={{ headerShown: false }}
        component={Welcome}
      />
      <Stack.Screen
        name="Login"
        options={{
          headerTransparent: true,
          headerTintColor: "white",
          title: "",
        }}
        component={Login}
      />
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTintColor: "white",
          title: "",
        }}
        name="CreateAccount"
        component={CreateAccount}
      />
      <Stack.Screen
        name="MyPage"
        options={{ headerShown: true, title: "_hyogeun_" }}
        component={MyPage}
      />
      <Stack.Screen
        name="Follower"
        options={{
          title: "팔로워",
        }}
        component={Follower}
      />
      <Stack.Screen
        name="Following"
        options={{
          title: "팔로잉",
        }}
        component={Following}
      />
    </Stack.Navigator>
  );
}
