import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";

interface Barber {
  id: number;
  name: string;
  location: string;
  stars: number;
  reviews: number;
  latitude: number;
  longitude: number;
}

interface initialRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const MapScreen = () => {
  const route = useRoute();
  const mapView = useRef<MapView>(null);
  const { barbers, initialRegion } = route.params as {
    barbers: Barber[];
    initialRegion: initialRegion;
  };
  const navigation = useNavigation();

  useEffect(() => {
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
  }, [mapView.current]);

  console.log("initialRegion", initialRegion);
  return (
    <View style={{ flex: 1 }}>
      <MapView ref={mapView} style={styles.map} initialRegion={initialRegion}>
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
