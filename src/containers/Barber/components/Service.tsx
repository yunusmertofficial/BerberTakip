import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../utils";
import { Service as ServiceType } from "../../../types/Barber";

const Service = ({ item }: { item: ServiceType }) => {
  return (
    <View style={styles.serviceItem}>
      <Text>{item.name}</Text>
      <Text>{item.price}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  serviceItem: {
    backgroundColor: colors.grey1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
});

export default Service;
