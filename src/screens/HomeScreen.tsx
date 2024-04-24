import { StatusBar } from "react-native";
import HomeContainer from "../containers/Home";
import { BarbersProvider } from "../context/BarbersContext";
import { colors } from "../utils";

const HomeScreen = () => {
  return (
    <BarbersProvider>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <HomeContainer />
    </BarbersProvider>
  );
};

export default HomeScreen;
