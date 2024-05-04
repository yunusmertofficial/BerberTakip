import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";
import QRCode from "react-native-qrcode-svg";
import RemainingTime from "../RemainingTime";
import { colors } from "@utils";
import { CircularProgress } from "@components/CircularProgress";
import { Button } from "@rneui/themed";
import ActiveAppointmentData from "@apiServices/activeAppointment/types/ActiveAppointmentData";
import { ScheduledAppointmentData } from "@apiServices/activeAppointment/types/ScheduledAppointmentData";
import {
  WaitingScheduleAppointment,
  WaitingWalkInAppointment,
} from "@apiServices/activeAppointment/types/WaitingAppointment";

const EstimatedStartTime = ({
  time,
  label,
  color,
}: {
  time: Date;
  label?: string;
  color?: string;
}) => {
  return (
    <>
      <Text
        style={
          color
            ? [
                styles.estimatedTimeText,
                {
                  color,
                },
              ]
            : styles.estimatedTimeText
        }
      >
        {label}
      </Text>
      <RemainingTime endTime={time} />
    </>
  );
};

const formatScheduledMessage = (appointment: ScheduledAppointmentData) => {
  const formattedDate = appointment.scheduledStartTime.toLocaleString("tr-TR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return `Planladığınız Randevu Zamanı: ${formattedDate}`;
};

const formatWaitingMessage = (
  appointment: WaitingScheduleAppointment | WaitingWalkInAppointment
) => {
  return `Sıra Numaranız: ${appointment.queueNumber}`;
};

const StatusText = ({
  appointment,
}: {
  appointment: ActiveAppointmentData;
}) => {
  let message = "";
  let color = colors.secondary;

  switch (appointment.status) {
    case "scheduled":
      color = colors.primary;
      message = formatScheduledMessage(appointment as ScheduledAppointmentData);
      break;
    case "waiting":
      color = colors.secondary;
      message = formatWaitingMessage(
        appointment as WaitingScheduleAppointment | WaitingWalkInAppointment
      );
      break;
    case "awaiting-confirmation":
      color = colors.warning;
      message = "Randevu Onay Bekliyor";
      break;
    case "confirmed":
      color = colors.success;
      message = "Randevu Onaylandı";
      break;
    default:
      return null; // Eğer hiçbir durum geçerli değilse, bileşeni render etmeme.
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: color,
        },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const AppointmentDetails = ({
  appointment,
}: {
  appointment: ActiveAppointmentData;
}) => {
  switch (appointment.status) {
    case "scheduled":
      return (
        <EstimatedStartTime
          label="Randevu Zamanı"
          time={(appointment as ScheduledAppointmentData).scheduledStartTime}
        />
      );
    case "waiting":
      return (
        <>
          <EstimatedStartTime
            label="Randevuya Kalan Süre"
            color={colors.warning}
            time={
              new Date(
                (
                  appointment as
                    | WaitingScheduleAppointment
                    | WaitingWalkInAppointment
                ).estimatedStartTime.getTime()
              )
            }
          />
        </>
      );

    case "awaiting-confirmation":
      return (
        <>
          <CircularProgress />
          <Text style={styles.estimatedTimeText}>
            Randevu Berber Tarafından Onay Bekliyor
          </Text>
        </>
      );

    case "confirmed":
      return (
        <EstimatedStartTime
          label="İptal Edilmesine Kalan Süre"
          color={colors.error}
          time={appointment.scheduledCancellationTime || new Date()}
        />
      );

    default:
      return null;
  }
};

const AppoinmentKey = ({
  appointment,
}: {
  appointment: ActiveAppointmentData;
}) => {
  return (
    <View style={styles.infoContainer}>
      <StatusText appointment={appointment} />
      <QRCode value={appointment.appointmentNumber} size={250} />
      <View style={[styles.detailsContainer, { alignItems: "center" }]}>
        <AppointmentDetails appointment={appointment} />
      </View>
      <Button
        title="Randevuyu İptal Et"
        onPress={() => {
          console.log("Randevu iptal edildi");
        }}
        color={colors.error}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  detailsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 25,
    paddingTop: 20,
  },
  estimatedTimeText: {
    fontSize: 18,
    color: colors.secondary,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  container: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AppoinmentKey;
