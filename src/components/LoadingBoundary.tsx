import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

interface LoadingBoundaryProps {
  children: React.ReactNode;
  isLoading: boolean;
}

const LoadingBoundary: React.FC<LoadingBoundaryProps> = ({
  children,
  isLoading,
}) => {
  return (
    <>
      {isLoading ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        children
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default LoadingBoundary;
