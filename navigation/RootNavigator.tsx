import AuthNavigator from "./stacks/AuthNavigator";
import { Dimensions, View } from "react-native";
import TabNav from "./TabNav";
import { useRef, useState } from "react";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

// Parametre listesi olarak boş bir obje tanımlayarak tip argümanını sağlıyoruz
function RootStack(): JSX.Element {
  const [routeName, setRouteName] = useState<string | undefined>(undefined);
  const ref = useRef<NavigationContainerRef<{}>>(null);

  return (
    <NavigationContainer
      ref={ref}
      onReady={() => {
        const initialRoute = ref.current?.getCurrentRoute();
        if (initialRoute?.name) {
          setRouteName(initialRoute.name);
        }
      }}
      onStateChange={async () => {
        const currentRouteName = ref.current?.getCurrentRoute()?.name;
        if (currentRouteName && currentRouteName !== routeName) {
          setRouteName(currentRouteName);
        }
      }}
    >
      <AuthNavigator>
        <View
          style={{
            width,
            height,
          }}
        >
          <TabNav routeName={routeName} />
        </View>
      </AuthNavigator>
    </NavigationContainer>
  );
}

export default RootStack;
