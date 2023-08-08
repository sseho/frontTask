import { createStackNavigator } from "@react-navigation/stack";
import Search from "../screens/SearchPage";
import SearchPage from "../screens/SearchPage";

const Stack = createStackNavigator();

export default function taskNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchPage" component={SearchPage} />
    </Stack.Navigator>
  );
}
