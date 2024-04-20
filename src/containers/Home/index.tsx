import React, { useState, useEffect } from "react";
import { View, FlatList, Animated } from "react-native";
import BarberListItem from "./components/BarberListItem";
import { Filter } from "./components/Filter";
import { SearchBar } from "../../components/SearchBar";
import { Barber } from "../../types";
import ErrorMessage from "./components/ErrorMessage";
// Ana ekran bileşeni
const HomeContainer = ({
  barbers,
  isLoading,
  errorMsg,
  fetchData,
}: {
  barbers: Barber[] | { id: number }[];
  isLoading: boolean;
  errorMsg: string | null;
  fetchData: () => void;
}) => {
  const [modalVisibile, setModalVisibile] = useState(false);
  const animatedValue = useState(new Animated.Value(0))[0] as Animated.Value;

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

  return (
    <View style={{ flex: 1 }}>
      <Filter
        modalVisibile={modalVisibile}
        setModalVisibile={setModalVisibile}
        barbers={barbers as Barber[]}
      />
      <SearchBar
        searchData={async (searchTerm) => {
          await new Promise((resolve) => setTimeout(resolve, 10000));
          console.log(searchTerm);
        }}
      />
      {errorMsg ? (
        <ErrorMessage errorMsg={errorMsg} fetchData={fetchData} />
      ) : (
        <FlatList
          data={barbers}
          renderItem={({ item }) => (
            <BarberListItem
              item={item}
              animatedValue={animatedValue}
              isLoading={isLoading}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default HomeContainer;
