import React from "react";
import { View, StyleSheet } from "react-native";

const Spacer = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.spacer}>{children}</View>;
};

const styles = StyleSheet.create({
  spacer: {
    margin: 15,
  },
});

export default Spacer;
