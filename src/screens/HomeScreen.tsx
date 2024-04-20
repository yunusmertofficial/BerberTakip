import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import HomeContainer from "../containers/Home";
import { Text } from "react-native";

const HomeScreen = () => {
  const route = useRoute();
  const { initialErrorMsg, isLoadingLocation } = route.params as {
    initialErrorMsg: string;
    isLoadingLocation: boolean;
  };

  const [barbers, setBarbers] = useState<any[]>([]);
  const [isLoading, setisLoading] = useState(isLoadingLocation);
  const [errorMsg, setErrorMsg] = useState(initialErrorMsg);

  useEffect(() => {
    // Fetch barbers data asynchronously
    const fetchBarbers = async () => {
      setisLoading(true);
      try {
        // Fetch data from API
        const data = [
          {
            id: 1,
            name: "Berber Fatih",
            location: "Toki Kayabaşı Konutları,Başakşehir/İstanbul",
            stars: 4,
            reviews: 20,
            latitude: 41.105402433528305,
            longitude: 28.75646534427912,
          },
          {
            id: 2,
            name: "Berber 2",
            location: "Safir Sitesi, Kayaşehir",
            stars: 5,
            reviews: 30,
            latitude: 41.105812931786566,
            longitude: 28.756585982472718,
          },
        ];

        setBarbers(data);
      } catch (error: any) {
        setErrorMsg(error.message);
      } finally {
        setisLoading(false);
      }
    };

    fetchBarbers();
  }, []);

  return (
    <>
      {errorMsg && <Text style={{ color: "red" }}>{errorMsg}</Text>}
      {!isLoadingLocation && !errorMsg && (
        <HomeContainer barbers={barbers} isLoading={isLoading} />
      )}
    </>
  );
};

export default HomeScreen;
