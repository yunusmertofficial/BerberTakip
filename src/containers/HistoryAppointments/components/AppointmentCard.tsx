import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button, Divider, Icon } from "@rneui/themed";
import { colors, formatDate } from "@utils";
import { isSameDay } from "date-fns";
import AppointmentResultData from "@apiServices/appointmentResult/types/AppointmentResultData";

const AppointmentCard = ({
  appointment,
}: {
  appointment: AppointmentResultData;
}) => {
  const formatStartTime = formatDate(appointment.startDate, "dd MMMM HH:mm");
  const formatEndTime = isSameDay(appointment.startDate, appointment.endDate)
    ? formatDate(appointment.endDate, "HH:mm")
    : formatDate(appointment.endDate, "dd MMMM HH:mm");

  return (
    <Card containerStyle={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>{appointment?.personnel?.barber?.name}</Text>
        <Text style={styles.price}>{`${appointment.totalPrice.toFixed(
          2
        )} TL`}</Text>
      </View>
      <Text
        style={styles.date}
      >{`Randevunuz ${formatStartTime} tarihinde başladı ve ${formatEndTime} tarihinde bitti.`}</Text>
      <Text style={styles.personnel}>
        {`Personel: ${appointment.personnel?.firstName} ${appointment.personnel?.lastName}`}
      </Text>
      <Text style={styles.services}>
        {appointment.completedServices
          .map((service) => service.service.name)
          .join(", ")}
      </Text>
      <Button
        title="Randevuyu Tekrarla"
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />
      {appointment.rating && (
        <View style={styles.ratingContainer}>
          <Divider style={styles.divider} />
          <Text style={styles.ratingLabel}>Puanlamanız </Text>
          <Icon
            name="star"
            type="material-community"
            color={colors.secondary}
          />
          <Text style={styles.rating}>{appointment.rating.ratingValue}</Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
    padding: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.secondary,
  },
  date: {
    fontSize: 14,
    color: colors.grey4,
    marginVertical: 5,
  },
  personnel: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.grey5,
    marginVertical: 5,
  },
  services: {
    fontSize: 15,
    fontWeight: "400",
    color: colors.grey3,
    marginVertical: 5,
  },
  button: {
    backgroundColor: colors.softError,
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 10,
    backgroundColor: colors.grey3,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  ratingLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.grey4,
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.black,
  },
});

export default React.memo(AppointmentCard);
