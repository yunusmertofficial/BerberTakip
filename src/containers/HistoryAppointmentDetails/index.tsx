import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import Header from "./components/Header";
import AppointmentDetails from "./components/AppointmentDetails";
import ServicesList from "./components/ServiceList";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../utils";
import { useRoute } from "@react-navigation/native";
import { fetchAppointmentResult } from "../../apiServices/appointmentResult";

const HistoryAppointmentDetailsContainer = () => {
  const route = useRoute();
  const { appointment_id }: any = route.params;
  const appointment = fetchAppointmentResult(appointment_id);
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
        services={appointment.completedServices}
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
