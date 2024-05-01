import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { colors } from "../../../utils";

const ServicesList = ({
  services,
}: {
  services: { id: number; name: string; price: number }[];
}) => {
  // Calculate the total cost
  const totalCost = services.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price} TL</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Toplam: {totalCost} TL</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider, // Light gray color from your colors object
  },
  itemName: {
    fontSize: 16,
    color: "#333", // Dark gray text
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333", // Dark gray text
  },
  totalContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary, // Turquoise color from your colors object
  },
});

export default ServicesList;
