import React from "react";
import BarberProfileContainer from "../containers/Barber";
import { StatusBar } from "react-native";
import { colors } from "../utils";

const BarberProfileScreen = () => {
  return (
    <React.Fragment>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <BarberProfileContainer />
    </React.Fragment>
  );
};

export default BarberProfileScreen;
