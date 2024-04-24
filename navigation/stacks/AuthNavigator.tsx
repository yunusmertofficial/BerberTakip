import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SigninScreen from "../../src/screens/SigninScreen";
import SignupScreen from "../../src/screens/SignupScreen";

const Stack = createNativeStackNavigator();

function AuthNavigator({ children }: { children: React.ReactNode }) {
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);

  return (
    <NavigationContainer>
      {!isSignedIn ? (
        <Stack.Navigator>
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
        </Stack.Navigator>
      ) : (
        children
      )}
    </NavigationContainer>
  );
}

export default AuthNavigator;
