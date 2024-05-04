import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";
import QRCode from "react-native-qrcode-svg";
import RemainingTime from "../RemainingTime";
import { colors } from "@utils";
import { CircularProgress } from "@components/CircularProgress";
import { Button } from "@rneui/themed";

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

const StatusText = ({
  status,
  scheduledAppointmentTime,
  queueNumber,
}: {
  status:
    | "scheduled"
    | "waiting"
    | "awaiting-confirmation"
    | "confirmed"
    | "in-progress";
  scheduledAppointmentTime?: Date;
  queueNumber?: number;
}) => {
  let message = "";
  let color = colors.secondary;

  switch (status) {
    case "scheduled":
      if (!scheduledAppointmentTime) return null;
      color = colors.primary;
      const formattedDate = scheduledAppointmentTime.toLocaleString("tr-TR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // 24 saatlik format
      });

      message = `Randevu Zamanınız: ${formattedDate}`;
      break;
    case "waiting":
      color = colors.secondary;
      message = queueNumber
        ? `Sıra Numaranız: ${queueNumber - 1}`
        : "Sıra Bekliyor";
      break;
    case "awaiting-confirmation":
      color = colors.warning;
      message = "Randevu Onay Bekliyor";
      break;
    case "confirmed":
      color = colors.success;
      message = "Randevu Onaylandı";
    case "in-progress":
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
  status,
  estimatedTime,
  waitingTimeInMinutes,
  confirmationTime,
}: {
  status:
    | "scheduled"
    | "waiting"
    | "awaiting-confirmation"
    | "confirmed"
    | "in-progress";
  estimatedTime?: Date;
  waitingTimeInMinutes: number;
  confirmationTime?: Date;
}) => {
  switch (status) {
    case "scheduled":
      if (estimatedTime) {
        return (
          <EstimatedStartTime
            label="Tahmini Randevu Başlangıç Zamanı"
            time={estimatedTime}
          />
        );
      } else {
        return null;
      }
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
        <>
          {confirmationTime ? (
            <EstimatedStartTime
              label="İptal Edilmesine Kalan Süre"
              color={colors.error}
              time={
                new Date(
                  confirmationTime.getTime() + waitingTimeInMinutes * 60000
                )
              }
            />
          ) : null}
        </>
      );
    case "in-progress":
      return (
        <>
          <Text style={styles.estimatedTimeText}>Randevu Başladı</Text>
        </>
      );

    default:
      return null;
  }
};

const AppoinmentKey = ({
  scheduledAppointmentTime,
  estimatedTime,
  waitingTimeInMinutes,
  confirmationTime,
  status,
  queueNumber,
  appointmentNumber,
}: {
  scheduledAppointmentTime?: Date;
  estimatedTime?: Date;
  appointmentNumber: string;
  queueNumber?: number;
  status:
    | "scheduled"
    | "waiting"
    | "awaiting-confirmation"
    | "confirmed"
    | "in-progress";
  waitingTimeInMinutes: number; // Müşterinin bekletilme süresi (dakika)
  confirmationTime?: Date; // Müşterinin randevusunun onaylandığı zaman
}) => {
  return (
    <View style={styles.infoContainer}>
      <StatusText
        status={status}
        scheduledAppointmentTime={scheduledAppointmentTime}
        queueNumber={queueNumber}
      />
      <QRCode value={appointmentNumber} size={250} />
      <View style={[styles.detailsContainer, { alignItems: "center" }]}>
        <AppointmentDetails
          status={status}
          estimatedTime={estimatedTime}
          waitingTimeInMinutes={waitingTimeInMinutes}
          confirmationTime={confirmationTime}
        />
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
