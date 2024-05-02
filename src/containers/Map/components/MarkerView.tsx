import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { Callout, Marker } from "react-native-maps";
import Barber from "src/types/Barber";
import HomeScreenProps from "src/types/navigation/screens/Home";

export const MarkerView = ({
  barber,
  navigation,
}: {
  barber: Barber;
  navigation: HomeScreenProps["navigation"];
}) => {
  return (
    <Marker
      title={barber.name}
      coordinate={{
        latitude: barber.latitude,
        longitude: barber.longitude,
      }}
    >
      <Callout
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <View style={styles.calloutContainer}>
          <Text style={styles.calloutText}>{barber.name}</Text>
          <Pressable
            style={styles.calloutButton}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Text style={styles.calloutButtonText}>Randevu Al</Text>
          </Pressable>
        </View>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContent: {
    backgroundColor: "#003580",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 4,
  },
  markerText: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  calloutContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  calloutText: {
    fontSize: 16,
    marginBottom: 5,
  },
  calloutButton: {
    backgroundColor: "#003580",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    zIndex: 99,
  },
  calloutButtonText: {
    color: "white",
    fontSize: 16,
  },
});
