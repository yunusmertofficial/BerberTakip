import React from "react";
import { View, StyleSheet } from "react-native";

const Card = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    elevation: 3, // Add elevation for a card-like effect
  },
});

export default Card;
