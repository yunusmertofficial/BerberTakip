import React from "react";
import { Text } from "@rneui/themed";
import { StyleSheet } from "react-native";

const CardHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text h3 style={styles.heading}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading: {
    marginBottom: 20,
    textAlign: "center",
  },
});

export default CardHeader;
