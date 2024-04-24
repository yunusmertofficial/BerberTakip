import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import MapView from "./components/MapView";
import Barber from "../../types/Barber";
import { fetchBarbers } from "../../apiServices/barber";
import ErrorFallbackComponent from "../../components/ErrorFallback";
import { setLocation } from "../../../features/user/userSlice";
import { getLocationCoords } from "../../utils";
import LoadingBoundary from "../../components/LoadingBoundary";

interface initialRegion {
  latitudeDelta: number;
  longitudeDelta: number;
}

const MapContainer = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const { barber_ids } = route.params as { barber_ids: number[] };
  const navigation = useNavigation();
  const coords = useSelector((state: RootState) => state.user.coordinates) as {
    latitude: number;
    longitude: number;
  };
  const { latitudeDelta, longitudeDelta } = route.params as initialRegion;
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchBarbers(barber_ids);
      setBarbers(data);
      setIsLoading(false);
    };
    fetchData();
  }, [barber_ids]);

  console.log(coords);

  return (
    <LoadingBoundary isLoading={isLoading}>
      <View style={{ flex: 1 }}>
        {coords && barbers.length > 0 && (
          <MapView
            barbers={barbers}
            initialRegion={{
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta,
              longitudeDelta,
            }}
          />
        )}
        <>
          {!coords && (
            <ErrorFallbackComponent
              title="Konum Bilgisi Alınamadı"
              error={"Konum Erişimi İzinlerini Kontrol Edin."}
              retryAgainMessage={"Konum Erişimine İzin Ver"}
              resetError={async () => {
                setIsLoading(true);
                try {
                  const coords = await getLocationCoords();
                  dispatch(setLocation(coords));
                } catch (error) {
                  console.log(error);
                } finally {
                  setIsLoading(false);
                }
              }}
            />
          )}
          {barbers.length === 0 && (
            <ErrorFallbackComponent
              title={"Berber Bulunamadı"}
              error={"Lütfen Berberlerinizi Filtreleyin."}
              retryAgainMessage={"Anasayfaya Dön"}
              resetError={() => {
                //@ts-ignore
                navigation.navigate("Home");
              }}
            />
          )}
        </>
      </View>
    </LoadingBoundary>
  );
};

export default MapContainer;
