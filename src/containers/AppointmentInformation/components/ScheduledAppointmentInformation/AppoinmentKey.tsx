import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";
import QRCode from "react-native-qrcode-svg";
import RemainingTime from "../RemainingTime";
import { colors } from "@utils";
import { CircularProgress } from "@components/CircularProgress";
import { Button } from "@rneui/themed";
enum AppointmentStatus {
  InQueue = "In Queue", // Müşteri sıradadır ve sıra numarası ile beklemektedir.
  Appointment = "Appointment", // Müşteri randevusu b
  InQueueWithAppointment = "In Queue with Appointment", // Müşteri, randevu alarak sıradadır ama sıra numarası yerine randevu saati ile sıralıdır.
  AwaitingBarberConfirmation = "Awaiting Barber Confirmation", // Berber tarafından onay beklenmektedir.
  ConfirmedByBarber = "Confirmed by Barber", // Berber tarafından onaylanmıştır.
}
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
  status: AppointmentStatus;
  scheduledAppointmentTime?: Date;
  queueNumber: number;
}) => {
  let message = "";
  let color = colors.secondary;

  switch (status) {
    case AppointmentStatus.AwaitingBarberConfirmation:
      color = colors.warning;
      message = "Randevu Onay Bekliyor";
      break;
    case AppointmentStatus.ConfirmedByBarber:
      color = colors.success;
      message = "Randevu Onaylandı";
      break;
    case AppointmentStatus.Appointment:
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
    case AppointmentStatus.InQueue:
    case AppointmentStatus.InQueueWithAppointment:
      color = colors.secondary;
      message = `Sıra Numaranız: ${queueNumber - 1}`;
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
  status: AppointmentStatus;
  estimatedTime?: Date;
  waitingTimeInMinutes: number;
  confirmationTime: Date;
}) => {
  switch (status) {
    case AppointmentStatus.Appointment:
    case AppointmentStatus.InQueue:
    case AppointmentStatus.InQueueWithAppointment:
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
    case AppointmentStatus.AwaitingBarberConfirmation:
      return (
        <>
          <CircularProgress />
          <Text style={styles.estimatedTimeText}>
            Randevu Berber Tarafından Onay Bekliyor
          </Text>
        </>
      );

    case AppointmentStatus.ConfirmedByBarber:
      return (
        <EstimatedStartTime
          label="İptal Edilmesine Kalan Süre"
          color={colors.error}
          time={
            new Date(confirmationTime.getTime() + waitingTimeInMinutes * 60000)
          }
        />
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
  queueNumber: number;
  status: AppointmentStatus;
  waitingTimeInMinutes: number; // Müşterinin bekletilme süresi (dakika)
  confirmationTime: Date; // Müşterinin randevusunun onaylandığı zaman
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
      {/* Randevuyu İptal et butonu */}
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
