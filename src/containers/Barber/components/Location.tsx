import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { colors } from "../../../utils";
import Barber from "../../../types/Barber";

const Location = ({ barber }: { barber: Barber }) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Berberin Lokasyonu</Text>
      <MapView
        style={styles.map}
        region={{
          latitude: barber.latitude,
          longitude: barber.longitude,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        }}
      >
        <Marker
          coordinate={{
            latitude: barber.latitude,
            longitude: barber.longitude,
          }}
          title={barber.name}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 10,
    marginTop: 20,
  },
  map: {
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default Location;
