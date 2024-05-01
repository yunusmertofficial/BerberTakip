import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button, Divider, Icon } from "@rneui/themed";
import { colors, formatDate } from "../../../utils";
import { isSameDay } from "date-fns";

const AppointmentCard = ({ appointment }: any) => {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>{appointment.barber}</Text>
        <Text style={styles.cost}>{appointment.cost.toFixed(2)} TL</Text>
      </View>
      <Text style={styles.date}>
        Randevunuz {formatDate(appointment.startDate, "dd MMMM HH:mm")}{" "}
        tarihinde başladı{" "}
        {isSameDay(appointment.startDate, appointment.endDate)
          ? formatDate(appointment.endDate, "HH:mm")
          : formatDate(appointment.endDate, "dd MMMM HH:mm")}
        'da bitti.
      </Text>
      <Text style={styles.services}>
        {appointment.services.map((service: any) => service.name).join(", ")}
      </Text>
      <Button
        title="Randevuyu Tekrarla"
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />
      {appointment.rating && (
        <>
          <Divider style={styles.divider} />
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>Puanlamanız </Text>
            <Icon
              name="star"
              type="material-community"
              color={colors.secondary}
            />
            <Text style={styles.rating}> {appointment.rating}</Text>
          </View>
        </>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  // Styles for AppointmentCard
  card: {
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.grey5,
  },
  cost: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black,
  },
  date: {
    fontSize: 16,
    color: colors.grey4,
    marginVertical: 5,
  },
  services: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.grey4,
    marginVertical: 5,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: colors.white,
  },
  divider: {
    marginVertical: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.grey4,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },
});

export default React.memo(AppointmentCard);
