import { StatusBar } from "react-native";
import HomeContainer from "../containers/Home";
import { BarbersProvider } from "../context/BarbersContext";
import { colors } from "../utils";
import CustomHeader from "@components/CustomHeader";

const HomeScreen = () => {
  return (
    <BarbersProvider>
      <StatusBar backgroundColor={colors.primary} barStyle="dark-content" />
      <CustomHeader />
      <HomeContainer />
    </BarbersProvider>
  );
};

export default HomeScreen;
