import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";

const BackgroundHeader = () => {
  return (
    <>
      <LinearGradient
        colors={["#ff0080", "#ff7f00"]}
        style={styles.background}
      />
      <View
        style={{
          height: 300,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Text h3 style={[styles.heading, { color: "white" }]}>
          BerberTakip
        </Text>
        <Text style={[styles.heading, { color: "lightgray" }]}>
          Kolayca berberinizden randevu alabilirsiniz
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  heading: {
    marginBottom: 20,
    textAlign: "center",
  },
});

export default BackgroundHeader;
