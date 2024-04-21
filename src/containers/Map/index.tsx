import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import MapView from "./components/MapView";
import { useBarbers } from "../../context/BarbersContext";

interface initialRegion {
  latitudeDelta: number;
  longitudeDelta: number;
}

const MapContainer = () => {
  const route = useRoute();
  const coords = useSelector((state: RootState) => state.user.coordinates) as {
    latitude: number;
    longitude: number;
  };
  const { latitudeDelta, longitudeDelta } = route.params as initialRegion;
  const { setErrorMsg } = useBarbers();
  const navigation = useNavigation();

  useEffect(() => {
    if (!coords) {
      setErrorMsg("Haritayı açmak için konum izni vermelisiniz.");
      //@ts-ignore
      navigation.navigate("Home");
    }
  }, [coords]);

  return (
    <View style={{ flex: 1 }}>
      {coords && (
        <MapView
          initialRegion={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta,
            longitudeDelta,
          }}
        />
      )}
    </View>
  );
};

export default MapContainer;
