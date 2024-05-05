import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, Animated } from "react-native";
import BarberListItem from "./components/BarberListItem";
import ErrorBoundary from "@components/ErrorBoundary";
import Barber from "src/types/Barber";

const HomeContainer = React.memo(
  ({
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
  }
);

export default HomeContainer;
