import React, { useRef, useEffect } from "react";
import ReactNativeMapView from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { MarkerView } from "./MarkerView";
import { useBarbers } from "../../../context/BarbersContext";
import Barber from "../../../types/Barber";

interface InitialRegion {
  latitudeDelta: number;
  longitudeDelta: number;
  latitude: number;
  longitude: number;
}

const MapView = ({ initialRegion }: { initialRegion: InitialRegion }) => {
  const mapView = useRef<ReactNativeMapView>(null);
  const { barbers } = useBarbers() as { barbers: Barber[] };
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
  }, [mapView?.current, initialRegion]);

  return (
    <ReactNativeMapView
      ref={mapView}
      style={{
        flex: 1,
      }}
      initialRegion={initialRegion}
    >
      {barbers.map((barber, index) => (
        <MarkerView key={index} barber={barber} navigation={navigation} />
      ))}
    </ReactNativeMapView>
  );
};

export default MapView;
