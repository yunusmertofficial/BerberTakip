import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthNavigator from "./stacks/AuthNavigator";
import HomeStackScreen from "./stacks/Home";
import { Icon } from "@rneui/themed";
import { colors } from "../src/utils";
import { Dimensions, View } from "react-native";
import HistoryAppointmentsScreen from "../src/screens/HistoryAppointmentsScreen";
import AppointmentInformationScreen from "../src/screens/AppointmentInformationScreen";

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window");

function RootStack() {
  return (
    <AuthNavigator>
      <View
        style={{
          width,
          height,
        }}
      >
        <Tab.Navigator
          screenOptions={{
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
            },
            tabBarInactiveTintColor: colors.white,
            tabBarActiveTintColor: colors.secondary,
            tabBarIconStyle: {
              fontSize: 50,
            },
          }}
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
            name="AppointmentInformation"
            component={AppointmentInformationScreen}
            options={{
              tabBarLabel: "Randevu Bilgilerim",
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
            name="HistoryAppointments"
            component={HistoryAppointmentsScreen}
            options={{
              tabBarLabel: "Randevu Geçmişin",
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
      </View>
    </AuthNavigator>
  );
}

export default RootStack;
