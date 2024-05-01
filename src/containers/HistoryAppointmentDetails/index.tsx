import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import Header from "./components/Header";
import AppointmentDetails from "./components/AppointmentDetails";
import ServicesList from "./components/ServiceList";
import { SafeAreaView } from "react-native-safe-area-context";
import Appointment from "../../types/Appointment";
import { colors } from "../../utils";

const HistoryAppointmentDetailsContainer = () => {
  const appointment: Appointment = {
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
  };

  const repeatAppointment = () => {
    // Placeholder function for repeating the appointment
    console.log("Repeating appointment...");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        personnel={appointment?.personnel}
        initialRating={appointment.rating?.ratingValue}
      />
      <AppointmentDetails
        appointmentNumber={appointment.appointmentNumber}
        location={appointment?.personnel?.barber?.location}
        startDate={appointment.startDate}
        endDate={appointment.endDate}
      />
      <ServicesList
        services={appointment.services}
        totalPrice={appointment.totalPrice}
        totalDuration={appointment.totalDuration}
      />
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
    backgroundColor: colors.background,
  },
  repeatButton: {
    backgroundColor: colors.primary,
    margin: 20,
    borderRadius: 10,
  },
});

export default HistoryAppointmentDetailsContainer;
