import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthNavigator from "./stacks/AuthNavigator";
import HomeStackScreen from "./stacks/Home";
import { Icon } from "@rneui/themed";
import { colors } from "../src/utils";
import MyAppointmentKeysScreen from "../src/screens/MyAppointmentKeysScreen";
import MyAppointmentsScreen from "../src/screens/MyAppointmentsScreen";
import { View } from "react-native";
const Tab = createBottomTabNavigator();

function RootStack() {
  return (
    <AuthNavigator>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          headerShown: false,
          tabBarStyle: {
            height: 60,
            backgroundColor: colors.primary,
          },
          tabBarItemStyle: {
            alignSelf: "center",
          },
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: "bold",
          },
          tabBarInactiveTintColor: colors.white,
          tabBarActiveTintColor: colors.secondary,
          tabBarIconStyle: {
            fontSize: 50,
          },
        })}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStackScreen}
          options={{
            tabBarLabel: "Anasayfa",
            tabBarIcon: ({ color, size }) => {
              return (
                <Icon
                  name="home"
                  type="font-awesome"
                  color={color}
                  size={size}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="MyAppointmentKeys"
          component={MyAppointmentKeysScreen}
          options={{
            tabBarLabel: "Randevu Anahtarım",
            tabBarIconStyle: {
              marginBottom: 10,
            },
            tabBarIcon: ({ color, size, focused }) => (
              <View
                style={{
                  marginBottom: 20,
                  borderRadius: 50,
                  backgroundColor: colors.primary,
                  borderColor: colors.white,
                  borderWidth: 2,
                  padding: 10,
                  height: 60,
                  width: 60,
                }}
              >
                <Icon
                  name="qrcode"
                  type="font-awesome"
                  color={color}
                  size={40}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="MyAppointments"
          component={MyAppointmentsScreen}
          options={{
            tabBarLabel: "Randevularım",
            tabBarIcon: ({ color, size }) => (
              <Icon
                name="calendar"
                type="font-awesome"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </AuthNavigator>
  );
}

export default RootStack;
