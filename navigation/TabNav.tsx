import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "./stacks/Home";
import HistoryAppointmentsStackScreen from "./stacks/HistoryAppointments";
import { Icon } from "@rneui/themed";
import { colors } from "../src/utils";
import { View } from "react-native";
import AppointmentInformationScreen from "../src/screens/AppointmentInformationScreen";
import TabNavParamList from "../src/types/navigation/TabNav";

const tabBarStyle = {
  height: 60,
  backgroundColor: colors.primary,
};

const Tab = createBottomTabNavigator<TabNavParamList>();

function TabNav({ routeName }: { routeName: string | undefined }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle,
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
              <Icon name="home" type="font-awesome" color={color} size={size} />
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
              <Icon name="qrcode" type="font-awesome" color={color} size={40} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="HistoryAppointmentsStack"
        component={HistoryAppointmentsStackScreen}
        options={({ route }) => ({
          tabBarLabel: "Randevu Geçmişim",
          tabBarStyle: {
            ...tabBarStyle,
            display:
              routeName === "HistoryAppointmentDetails" ? "none" : "flex",
          },
          tabBarIcon: ({ color, size }) => {
            return (
              <Icon
                name="calendar"
                type="font-awesome"
                color={color}
                size={size}
              />
            );
          },
        })}
      />
    </Tab.Navigator>
  );
}

export default TabNav;
