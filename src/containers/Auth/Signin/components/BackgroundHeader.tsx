import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";
import { colors } from "@utils";

const BackgroundHeader = () => {
  return (
    <>
      <LinearGradient
        colors={[colors.secondary, colors.primary]}
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
        <Text h3 style={[styles.heading, { color: colors.grey2 }]}>
          BerberTakip
        </Text>
        <Text style={[styles.heading, { color: colors.white }]}>
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
