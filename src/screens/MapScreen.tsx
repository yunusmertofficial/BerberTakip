import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useBarbers } from "../context/BarbersContext";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Barber } from "../types";

interface initialRegion {
  latitudeDelta: number;
  longitudeDelta: number;
}

const MapScreen = () => {
  const route = useRoute();
  const mapView = useRef<MapView>(null);
  const { barbers } = useBarbers() as { barbers: Barber[] };
  const coords = useSelector((state: RootState) => state.user.coordinates) as {
    latitude: number;
    longitude: number;
  };
  const { latitudeDelta, longitudeDelta } = route.params as initialRegion;
  const navigation = useNavigation();

  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      if (mapView.current && barbers) {
        const coordinates = barbers.map((barber) => ({
          latitude: barber.latitude,
          longitude: barber.longitude,
        }));
        mapView.current.fitToCoordinates(coordinates, {
          edgePadding: {
            top: 190,
            left: 190,
            bottom: 190,
            right: 190,
          },
        });
      }
    } else {
      //@ts-ignore
      navigation.navigate("Home");
    }
  }, [mapView?.current]);

  return (
    <View style={{ flex: 1 }}>
      {coords.latitude && coords.longitude && (
        <MapView
          ref={mapView}
          style={styles.map}
          initialRegion={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta,
            longitudeDelta,
          }}
        >
          {barbers &&
            barbers.map((barber, index) => (
              <Marker
                key={index}
                title={barber.name}
                coordinate={{
                  latitude: barber.latitude,
                  longitude: barber.longitude,
                }}
              >
                <Callout
                  onPress={() => {
                    //@ts-ignore
                    navigation.navigate("Home");
                  }}
                >
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>{barber.name}</Text>
                    <Pressable
                      style={styles.calloutButton}
                      onPress={() => {
                        //@ts-ignore
                        navigation.navigate("Home");
                      }}
                    >
                      <Text style={styles.calloutButtonText}>Randevu Al</Text>
                    </Pressable>
                  </View>
                </Callout>
              </Marker>
            ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
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

export default MapScreen;
