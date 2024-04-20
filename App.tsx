import { decode } from "base-64";
global.atob = decode;
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { RootState } from "./store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import {
  clearUser as clearUserRedux,
  setUser,
} from "./features/user/userSlice";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from "./src/screens/MapScreen";
import { CircularProgress } from "./src/components/CircularProgress";

export default function AppContainer() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  const dispatch = useDispatch();
  const [loadingToken, setLoadingToken] = React.useState(true);

  // Check user authentication status on app start
  React.useEffect(() => {
    checkToken();
  }, []);

  const clearUser = () => {
    dispatch(clearUserRedux());
    AsyncStorage.removeItem("token");
  };

  const checkToken = async () => {
    setLoadingToken(true);
    try {
      const token = await AsyncStorage.getItem("token");
      //apiye istek atıp orada token kontrolü yapılabilir
      const isValidToken = token && typeof token === "string";
      if (isValidToken) {
        const decoded = jwtDecode(token);
        const expirationTime = Number(decoded.exp) * 1000;
        const currentTime = Date.now();
        if (expirationTime < currentTime) {
          clearUser();
        } else {
          dispatch(
            setUser({
              ...decoded,
              latitude: undefined,
              longitude: undefined,
            })
          );
        }
      } else {
        clearUser();
      }
    } catch (error) {
      console.error("Token kontrol edilirken hata oluştu:", error);
    } finally {
      setLoadingToken(false);
    }
  };

  return loadingToken ? <CircularProgress /> : <RootStack />;
}

const Stack = createNativeStackNavigator();

function RootStack() {
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isSignedIn ? "Home" : "SignIn"}>
        {isSignedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Map"
              component={MapScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
