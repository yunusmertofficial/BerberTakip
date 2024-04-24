import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BarbersProvider } from "../../src/context/BarbersContext";
import HomeScreen from "../../src/screens/HomeScreen";
import MapScreen from "../../src/screens/MapScreen";
import { colors } from "../../src/utils";
import BarberProfileScreen from "../../src/screens/BarberProfileScreen";

const Stack = createNativeStackNavigator();

const Screen1 = () => {
  return (
    <BarbersProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{
            title: "Harita",
            headerShown: true,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: colors.primary,
            },
          }}
        />
      </Stack.Navigator>
    </BarbersProvider>
  );
};

const HomeStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Screen1"
        component={Screen1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BarberProfile"
        component={BarberProfileScreen}
        options={{
          title: "Berber Profili",
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackScreen;
