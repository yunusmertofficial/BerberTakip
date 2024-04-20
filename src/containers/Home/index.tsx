import React, { useState, useEffect } from "react";
import { View, FlatList, Animated } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import BarberListItem from "./components/BarberListItem";
import { RootState } from "../../../store";
import { Filter } from "./components/Filter";
import { SearchBar } from "../../components/SearchBar";
import BarberListItemPlaceholder from "./components/Skeletion";

// Ana ekran bileşeni
const HomeContainer = ({
  barbers,
  isLoading,
}: {
  barbers:
    | {
        id: number;
        name: string;
        location: string;
        stars: number;
        reviews: number;
        latitude: number;
        longitude: number;
      }[]
    | {
        id: number;
      }[];
  isLoading: boolean;
}) => {
  const coordinates = useSelector(
    (state: RootState) => state.user.coordinates
  ) as {
    latitude: number;
    longitude: number;
  };
  const [modalVisibile, setModalVisibile] = useState(false);
  const navigation = useNavigation();

  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleMapNavigation = () => {
    //@ts-ignore
    navigation.navigate("Map", {
      barbers: barbers,
      initialRegion: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <Filter
        modalVisibile={modalVisibile}
        setModalVisibile={setModalVisibile}
        handleMapNavigation={handleMapNavigation}
      />
      <SearchBar
        searchData={async (searchTerm) => {
          await new Promise((resolve) => setTimeout(resolve, 10000));
          console.log(searchTerm);
        }}
      />

      <FlatList
        data={
          isLoading
            ? [
                {
                  id: 1,
                },
                {
                  id: 2,
                },
                {
                  id: 3,
                },
              ]
            : barbers
        }
        renderItem={({ item }) => (
          <BarberListItem
            item={item}
            animatedValue={animatedValue}
            isLoading={isLoading}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default HomeContainer;
