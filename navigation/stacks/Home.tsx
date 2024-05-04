import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../src/screens/HomeScreen";
import MapScreen from "../../src/screens/MapScreen";
import { colors } from "../../src/utils";
import BarberProfileScreen from "../../src/screens/BarberProfileScreen";
import HomeStackParamList from "../../src/types/navigation/stacks/Home";

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Harita",
          headerShown: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="BarberProfile"
        component={BarberProfileScreen}
        options={{
          title: "Berber Profili",
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackScreen;
