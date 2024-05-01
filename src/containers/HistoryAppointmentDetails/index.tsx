import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import Header from "./components/Header";
import AppointmentDetails from "./components/AppointmentDetails";
import ServicesList from "./components/ServiceList";
import { SafeAreaView } from "react-native-safe-area-context";

const HistoryAppointmentDetailsContainer = () => {
  const barber = {
    id: 1,
    name: "Ahmet Berber",
    location: "İstiklal Caddesi No: 123, Beyoğlu, İstanbul",
    latitude: 41.105402433528305,
    longitude: 28.75646534427912,
  };
  const appointment = {
    id: 2,
    appointmentNumber: "202404230001",
    startDate: new Date("2024-04-23T15:00"),
    endDate: new Date("2024-04-24T18:00"),
    rating: null,
    services: [
      { id: 1, name: "Saç Kesimi", price: 40 },
      { id: 2, name: "Tıraş", price: 25 },
      { id: 3, name: "Sakal Tıraşı", price: 20 },
    ],
  };

  const repeatAppointment = () => {
    // Placeholder function for repeating the appointment
    console.log("Repeating appointment...");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header barber={barber} />
      <AppointmentDetails
        appointmentNumber={appointment.appointmentNumber}
        location={barber.location}
        startDate={appointment.startDate}
        endDate={appointment.endDate}
      />
      <ServicesList services={appointment.services} />
      <Button
        title="Randevuyu Tekrarla"
        onPress={repeatAppointment}
        buttonStyle={styles.repeatButton}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Use a consistent background color
  },
  repeatButton: {
    backgroundColor: "#38B2AC", // Turquoise, matching your primary color
    margin: 20,
    borderRadius: 10,
  },
});

export default HistoryAppointmentDetailsContainer;
