import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import { colors, formatDate } from "../../../utils";
import { isSameDay } from "date-fns";

const AppointmentDetails = ({
  appointmentNumber,
  location,
  startDate,
  endDate,
}: {
  appointmentNumber: string;
  location: string;
  startDate: Date;
  endDate: Date;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Randevu Numaranız: #{appointmentNumber}</Text>
      <View style={styles.dateLocationContainer}>
        <Icon
          name="location-pin"
          type="entypo"
          color={colors.primary} // Turquoise color for the icon
          size={24}
          style={styles.icon}
        />
        <Text style={styles.location}>{location}</Text>
      </View>
      <Text style={styles.date}>
        Randevunuz {formatDate(startDate, "dd MMMM HH:mm")} tarihinde başladı{" "}
        {isSameDay(startDate, endDate)
          ? formatDate(endDate, "HH:mm")
          : formatDate(endDate, "dd MMMM HH:mm")}
        'da bitti.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.grey2, // Light gray background
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 10,
  },
  dateLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  location: {
    fontSize: 16,
    color: colors.grey5, // Dark gray text for location
  },
  date: {
    fontSize: 16,
    color: colors.grey5,
  },
});

export default AppointmentDetails;
