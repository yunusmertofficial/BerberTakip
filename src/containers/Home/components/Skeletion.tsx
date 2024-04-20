import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BarberListItemPlaceholder = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.avatarPlaceholder} />
        <View style={styles.buttonPlaceholder} />
      </View>
      <View style={styles.centerContainer}>
        <View style={styles.titlePlaceholder} />
        <View style={styles.locationPlaceholder} />
        <View style={styles.starsPlaceholder} />
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.iconPlaceholder} />
        <View style={styles.appointmentTextPlaceholder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "#f0f0f0",
  },
  leftContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#d3d3d3",
    marginBottom: 5,
  },
  buttonPlaceholder: {
    width: 60,
    height: 20,
    backgroundColor: "#d3d3d3",
  },
  centerContainer: {
    flex: 1,
    marginLeft: 10,
  },
  titlePlaceholder: {
    width: "70%",
    height: 20,
    backgroundColor: "#d3d3d3",
    marginBottom: 5,
  },
  locationPlaceholder: {
    width: "50%",
    height: 15,
    backgroundColor: "#d3d3d3",
    marginBottom: 5,
  },
  starsPlaceholder: {
    width: "50%",
    height: 15,
    backgroundColor: "#d3d3d3",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconPlaceholder: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#d3d3d3",
    marginRight: 5,
  },
  appointmentTextPlaceholder: {
    width: 60,
    height: 20,
    backgroundColor: "#d3d3d3",
  },
});

export default BarberListItemPlaceholder;
