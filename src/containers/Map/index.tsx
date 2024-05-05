import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store";
import MapView from "./components/MapView";
import Barber from "src/types/Barber";
import { fetchBarbers } from "@apiServices/barber";
import ErrorFallbackComponent from "@components/ErrorFallback";
import { setLocation } from "@features/user/userSlice";
import LoadingBoundary from "@components/LoadingBoundary";
import HomeScreenProps from "src/types/navigation/screens/Home";
import MapScreenProps from "src/types/navigation/screens/Map";
import { saveLocationData } from "src/utils/locationUtils";

const MapContainer = () => {
  const route = useRoute<MapScreenProps["route"]>();
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeScreenProps["navigation"]>();
  const coords = useSelector(
    (state: RootState) => state.user.location.coordinates
  );

  const { latitudeDelta, longitudeDelta, barberIds } = route.params;
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchBarbers();
      setBarbers(data);
      setIsLoading(false);
    };
    fetchData();
  }, [barberIds]);

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
                  const location = await saveLocationData();
                  if (location) {
                    dispatch(
                      setLocation({
                        coordinates: location.coordinates,
                        address: location.address,
                      })
                    );
                  }
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
                navigation.navigate("Home", {});
              }}
            />
          )}
        </>
      </View>
    </LoadingBoundary>
  );
};

export default MapContainer;
