import React, { useState, useEffect } from "react";
import { View, FlatList, Animated } from "react-native";
import BarberListItem from "./components/BarberListItem";
import { Filter } from "./components/Filter";
import { SearchBar } from "../../components/SearchBar";
import ErrorMessage from "./components/ErrorMessage";
import { useBarbers } from "../../context/BarbersContext";

const HomeContainer = () => {
  const { barbers, isLoading, errorMsg } = useBarbers();
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
      />
      <SearchBar
        searchData={async (searchTerm) => {
          await new Promise((resolve) => setTimeout(resolve, 10000));
          console.log(searchTerm);
        }}
      />
      {errorMsg ? (
        <ErrorMessage />
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
