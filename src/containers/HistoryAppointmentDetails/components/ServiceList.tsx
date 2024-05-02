import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { colors } from "../../../utils";
import Service from "../../../types/Service";
import { formatDurationMinutes } from "../../../utils/dateUtil";

interface Props {
  services: {
    service: Service;
    duration: number;
  }[];
  totalPrice: number;
  totalDuration: number;
}

const ServicesList: React.FC<Props> = ({
  services,
  totalPrice,
  totalDuration,
}) => {
  const renderItem = ({
    item,
    index,
  }: {
    item: {
      service: Service;
      duration: number;
    };
    index: number;
  }) => (
    <View
      style={[
        styles.row,
        { backgroundColor: index % 2 === 1 ? colors.grey2 : colors.white },
      ]}
    >
      <Text style={styles.text}>{item.service.name}</Text>
      <Text style={styles.text}>{formatDurationMinutes(item.duration)}</Text>
      <Text style={styles.text}>{`${item.service.price} TL`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.head]}>
        <Text style={[styles.text, styles.headText]}>Hizmet Adı</Text>
        <Text style={[styles.text, styles.headText]}>Süre</Text>
        <Text style={[styles.text, styles.headText]}>Fiyatı</Text>
      </View>
      <FlatList
        data={services}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalTextLabel}>Toplam:</Text>
        <Text style={styles.totalText}>{totalPrice} TL</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalTextLabel}>Toplam Süre:</Text>
        <Text style={styles.totalText}>
          {formatDurationMinutes(totalDuration)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  head: {
    backgroundColor: colors.primary,
  },
  headText: {
    fontWeight: "bold",
    color: colors.white,
  },
  text: {
    flex: 1,
    textAlign: "center",
    color: colors.black,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "center",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
  totalTextLabel: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },
});

export default ServicesList;
