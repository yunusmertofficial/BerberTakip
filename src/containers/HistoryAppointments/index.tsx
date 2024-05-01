import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@rneui/themed";
import AppointmentCard from "./components/AppointmentCard";
import { colors } from "../../utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const appointments = [
  {
    id: 1,
    barber: "Berber Ali",
    cost: 100,
    startDate: new Date("2024-04-22T14:56"),
    endDate: new Date("2024-04-22T19:00"),
    rating: 4,
    services: [
      { id: 1, name: "Saç Kesimi", price: 40 },
      { id: 2, name: "Tıraş", price: 25 },
    ],
  },
  {
    id: 2,
    barber: "Berber Hasan",
    cost: 80,
    startDate: new Date("2024-04-23T15:00"),
    endDate: new Date("2024-04-24T18:00"),
    services: [
      { id: 1, name: "Saç Kesimi", price: 40 },
      { id: 2, name: "Tıraş", price: 25 },
    ],
    rating: null,
  },
  // daha fazla randevu...
];

const HistoryAppointmentsContainer = () => {
  const navigation = useNavigation();
  const handlePress = (appointment_id: string) => {
    //@ts-ignore
    navigation.navigate("HistoryAppointmentDetails", { appointment_id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text h4 style={styles.header}>
        Geçmiş Randevularım
      </Text>
      <FlatList
        data={appointments}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id.toString())}>
            <AppointmentCard appointment={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
    textAlign: "center",
    backgroundColor: colors.background,
  },
});

export default HistoryAppointmentsContainer;
