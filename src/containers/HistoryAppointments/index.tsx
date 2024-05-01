import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@rneui/themed";
import AppointmentCard from "./components/AppointmentCard";
import { colors } from "../../utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Appointment from "../../types/Appointment";

const appointments: Appointment[] = [
  {
    id: 1,
    appointmentNumber: "202404230001",
    startDate: new Date("2024-04-23T15:00"),
    endDate: new Date("2024-04-24T18:00"),
    totalPrice: 85,
    totalDuration: 120,
    services: [
      { id: 1, name: "Saç Kesimi", price: 40, duration: 30 },
      { id: 2, name: "Tıraş", price: 25, duration: 30 },
      { id: 3, name: "Sakal Tıraşı", price: 20, duration: 60 },
    ],
    personnel: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      barber: {
        id: 1,
        name: "Barber Shop",
        location: "İstanbul",
        stars: 4.5,
        reviews: 125,
        latitude: 41.0082,
        longitude: 28.9784,
        rating: 4.5,
        completed_appointments: 1250,
      },
    },
  },
  {
    id: 2,
    appointmentNumber: "202404230001",
    startDate: new Date("2024-04-23T15:00"),
    endDate: new Date("2024-04-24T18:00"),
    totalPrice: 85,
    totalDuration: 120,
    services: [
      { id: 1, name: "Saç Kesimi", price: 40, duration: 30 },
      { id: 2, name: "Tıraş", price: 25, duration: 30 },
      { id: 3, name: "Sakal Tıraşı", price: 20, duration: 60 },
    ],
    personnel: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      barber: {
        id: 1,
        name: "Barber Shop",
        location: "İstanbul",
        stars: 4.5,
        reviews: 125,
        latitude: 41.0082,
        longitude: 28.9784,
        rating: 4.5,
        completed_appointments: 1250,
      },
    },
  },
  {
    id: 3,
    appointmentNumber: "202404230001",
    startDate: new Date("2024-04-23T15:00"),
    endDate: new Date("2024-04-24T18:00"),
    totalPrice: 85,
    totalDuration: 120,
    rating: {
      ratingValue: 4.5,
      id: 1,
      comment: "Great service!",
      date: new Date("2024-04-24T18:00"),
    },
    services: [
      { id: 1, name: "Saç Kesimi", price: 40, duration: 30 },
      { id: 2, name: "Tıraş", price: 25, duration: 30 },
      { id: 3, name: "Sakal Tıraşı", price: 20, duration: 60 },
    ],
    personnel: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      barber: {
        id: 1,
        name: "Barber Shop",
        location: "İstanbul",
        stars: 4.5,
        reviews: 125,
        latitude: 41.0082,
        longitude: 28.9784,
        rating: 4.5,
        completed_appointments: 1250,
      },
    },
  },
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
