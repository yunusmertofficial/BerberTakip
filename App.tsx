import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import BarberProfileScreen from "./src/screens/BarberProfileScreen";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from "./src/screens/MapScreen";
import { BarbersProvider } from "./src/context/BarbersContext";
import useAuthentication from "./src/hooks/useAuthentication";
import ErrorBoundary from "./src/components/ErrorBoundary";
import LoadingBoundary from "./src/components/LoadingBoundary";
import { colors } from "./src/utils";

export default function AppContainer() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  const { loadingToken, error, checkToken } = useAuthentication();

  return (
    <LoadingBoundary isLoading={loadingToken}>
      <ErrorBoundary isErrored={error} resetError={checkToken}>
        <RootStack />
      </ErrorBoundary>
    </LoadingBoundary>
  );
}

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

function RootStack() {
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <Stack.Group>
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
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="Signin"
              component={SigninScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
