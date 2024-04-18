import * as React from "react";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";

const RootStack = createNativeStackNavigator({
  screens: {
    Signin: {
      screen: SigninScreen,
      options: {
        headerShown: false, // Başlık çubuğunu gizler
      },
    },
    Signup: {
      screen: SignupScreen,
      options: {
        title: "Kayıt",
        headerShown: false, // Başlık çubuğunu gizler
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
