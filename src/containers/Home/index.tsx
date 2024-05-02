import React, { useState, useEffect } from "react";
import { View, FlatList, Animated } from "react-native";
import BarberListItem from "./components/BarberListItem";
import { useBarbers } from "@context/BarbersContext";
import { Header } from "./components/Header";
import FilterModal from "./components/FilterModal";
import ErrorBoundary from "@components/ErrorBoundary";
import Barber from "src/types/Barber";

const HomeContainer = () => {
  const { barbers, isLoading, errorMsg, fetchData } = useBarbers();
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
      <FilterModal
        modalVisible={modalVisibile}
        setModalVisible={setModalVisibile}
        applyFilters={(filters) => console.log(filters)}
      />
      <Header modalVisible={modalVisibile} setModalVisible={setModalVisibile} />
      <ErrorBoundary
        resetError={fetchData}
        isErrored={!!errorMsg}
        error={errorMsg}
      >
        <FlatList
          data={barbers}
          renderItem={({ item }) => (
            <BarberListItem
              item={item as Barber}
              animatedValue={animatedValue}
              isLoading={isLoading}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </ErrorBoundary>
    </View>
  );
};

export default HomeContainer;
