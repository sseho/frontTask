import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TaskNav from "./navigators/taskNav";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { RecoilRoot } from "recoil";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#f3f3f3",
  },
};

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer theme={MyTheme}>
        <TaskNav />
      </NavigationContainer>
    </RecoilRoot>
  );
}
