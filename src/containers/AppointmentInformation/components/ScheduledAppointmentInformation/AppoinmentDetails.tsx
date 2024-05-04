import React from "react";
import { FlatList, Linking, StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";
import { colors, formatDate } from "../../../../utils";
import { Button } from "@rneui/base";
import Service from "src/types/Service";
import ActiveAppointmentData from "@apiServices/activeAppointment/types/ActiveAppointmentData";
import {
  WaitingScheduleAppointment,
  WaitingWalkInAppointment,
} from "@apiServices/activeAppointment/types/WaitingAppointment";
import {
  AwaitingConfirmationScheduleAppointment,
  AwaitingConfirmationWalkInAppointment,
} from "@apiServices/activeAppointment/types/AwaitingConfirmationAppointment";
import {
  ConfirmedScheduleAppointment,
  ConfirmedWalkInAppointment,
} from "@apiServices/activeAppointment/types/ConfirmedAppointmentData";
import { ScheduledAppointmentData } from "@apiServices/activeAppointment/types/ScheduledAppointmentData";
import {
  InProgressScheduleAppointment,
  InProgressWalkInAppointment,
} from "@apiServices/activeAppointment/types/InProgressAppointmentData";
import { isToday } from "date-fns";
import { CircularProgress } from "@components/CircularProgress";

const formatToTodayOrDate = (date: Date, formatStr: string) => {
  if (isToday(date)) {
    return formatDate(date, "HH:mm");
  } else {
    return formatDate(date, formatStr);
  }
};

const serviceItem = ({ item }: { item: Service }) => (
  <View style={styles.serviceItem}>
    <Text style={styles.serviceName}>{item.name}</Text>
    <Text>Price: ${item.price}</Text>
    <Text>Duration: {item.estimatedDuration} minutes</Text>
  </View>
);

const InProgressAppointmentInformation = ({
  appointment,
}: {
  appointment: InProgressWalkInAppointment | InProgressScheduleAppointment;
}) => {
  return (
    <>
      <Text style={styles.detailText}>
        <Text style={styles.detailTextBold}>Randevunuz Başladı:</Text>{" "}
        {formatToTodayOrDate(
          appointment.startTime,
          "eeee, dd MMMM yyyy, HH:mm"
        )}
      </Text>
      {appointment.source === "schedule" && (
        <Text style={styles.detailText}>
          <Text style={styles.detailTextBold}>Randevu Planladığınız Saat:</Text>{" "}
          {formatToTodayOrDate(
            appointment.scheduledStartTime,
            "eeee, dd MMMM yyyy, HH:mm"
          )}
        </Text>
      )}
      {appointment.source === "walk-in" && (
        <Text style={styles.detailText}>
          <Text style={styles.detailTextBold}>Randevu Aldığınız Saat:</Text>{" "}
          {formatToTodayOrDate(
            appointment.checkInTime,
            "eeee, dd MMMM yyyy, HH:mm"
          )}
        </Text>
      )}
      <Text style={styles.detailText}>
        <Text style={styles.detailTextBold}>
          Randevunuzun Onaylandığı Saat:
        </Text>{" "}
        {formatToTodayOrDate(
          appointment.confirmationTime,
          "eeee, dd MMMM yyyy, HH:mm"
        )}
      </Text>
    </>
  );
};

const ScheduledAppointmentInformation = ({
  appointment,
}: {
  appointment: ScheduledAppointmentData;
}) => {
  const scheduledTimeString = formatToTodayOrDate(
    appointment.scheduledStartTime,
    "eeee, dd MMMM yyyy, HH:mm"
  );

  return (
    <Text style={styles.detailText}>
      <Text style={styles.detailTextBold}>Randevu Planladığınız Saat:</Text>{" "}
      {scheduledTimeString}
    </Text>
  );
};

const ConfirmedAppointmentInformation = ({
  appointment,
}: {
  appointment: ConfirmedWalkInAppointment | ConfirmedScheduleAppointment;
}) => {
  return (
    <>
      <Text style={styles.detailText}>
        <Text style={styles.detailTextBold}>Randevu Onaylandı</Text>{" "}
        {formatToTodayOrDate(
          appointment.confirmationTime,
          "eeee, dd MMMM yyyy, HH:mm"
        )}
      </Text>
      {appointment.source === "schedule" && (
        <Text style={styles.detailText}>
          <Text style={styles.detailTextBold}>Randevu Planladığınız Saat:</Text>{" "}
          {formatToTodayOrDate(
            appointment.scheduledStartTime,
            "eeee, dd MMMM yyyy, HH:mm"
          )}
        </Text>
      )}
      {appointment.source === "walk-in" && (
        <Text style={styles.detailText}>
          <Text style={styles.detailTextBold}>Randevu Aldığınız Saat:</Text>{" "}
          {formatToTodayOrDate(
            appointment.checkInTime,
            "eeee, dd MMMM yyyy, HH:mm"
          )}
        </Text>
      )}
    </>
  );
};

const WaitingAppointmentInformation = ({
  appointment,
}: {
  appointment: WaitingScheduleAppointment | WaitingWalkInAppointment;
}) => {
  const estimatedTimeString = formatToTodayOrDate(
    appointment.estimatedStartTime,
    "HH:mm"
  );

  return (
    <>
      <Text style={styles.detailText}>
        <Text style={styles.detailTextBold}>Sıra Numaranız:</Text>{" "}
        {appointment.queueNumber}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.detailTextBold}>Tahmini Başlangıç Saati:</Text>{" "}
        {estimatedTimeString}
      </Text>

      {appointment.source === "schedule" && (
        <Text style={styles.detailText}>
          <Text style={styles.detailTextBold}>Randevu Planladığınız Saat:</Text>{" "}
          {formatToTodayOrDate(
            appointment.scheduledStartTime,
            "eeee, dd MMMM yyyy, HH:mm"
          )}
        </Text>
      )}
    </>
  );
};

const AwaitingConfirmationAppointmentInformation = ({
  appointment,
}: {
  appointment:
    | AwaitingConfirmationWalkInAppointment
    | AwaitingConfirmationScheduleAppointment;
}) => {
  return (
    <>
      <Text style={styles.detailText}>
        <Text style={styles.detailTextBold}>Randevu Bekleniyor</Text>
        <CircularProgress />
      </Text>
    </>
  );
};

const ListHeaderComponent = ({
  appointment,
}: {
  appointment: ActiveAppointmentData;
}) => {
  return (
    <View>
      <Text style={styles.detailText}>
        <Text style={styles.detailTextBold}>Randevu Numarası:</Text>{" "}
        {appointment.appointmentNumber}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.detailTextBold}>Berber Adı:</Text>{" "}
        {appointment.personnel.barber?.name}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.detailTextBold}>Hizmet Sağlayıcı:</Text>{" "}
        {appointment.personnel.firstName} {appointment.personnel.lastName}
      </Text>
      {appointment.status === "in-progress" && (
        <InProgressAppointmentInformation
          appointment={
            appointment as
              | InProgressWalkInAppointment
              | InProgressScheduleAppointment
          }
        />
      )}
      {appointment.status === "scheduled" && (
        <ScheduledAppointmentInformation
          appointment={appointment as ScheduledAppointmentData}
        />
      )}
      {appointment.status === "confirmed" && (
        <ConfirmedAppointmentInformation
          appointment={
            appointment as
              | ConfirmedWalkInAppointment
              | ConfirmedScheduleAppointment
          }
        />
      )}
      {appointment.status === "waiting" && (
        <WaitingAppointmentInformation
          appointment={
            appointment as WaitingScheduleAppointment | WaitingWalkInAppointment
          }
        />
      )}
      {appointment.status === "awaiting-confirmation" && (
        <AwaitingConfirmationAppointmentInformation
          appointment={
            appointment as
              | AwaitingConfirmationWalkInAppointment
              | AwaitingConfirmationScheduleAppointment
          }
        />
      )}

      <Text style={styles.detailText}>
        <Text style={styles.detailTextBold}>Kısa Adres:</Text>{" "}
        {appointment.personnel.barber?.location}
      </Text>

      <Button
        title="Yol Tarifi Al"
        onPress={() => {
          const latitude = appointment.personnel.barber?.latitude;
          const longitude = appointment.personnel.barber?.longitude;
          const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
          Linking.openURL(url);
        }}
      />
      <Text style={styles.title}>Hizmetler</Text>
    </View>
  );
};

const ListFooterComponent = ({
  totalServiceDuration,
  totalServicePrice,
}: {
  totalServiceDuration: number;
  totalServicePrice: number;
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text style={styles.detailText}>
        <Text style={styles.detailTextBold}>Toplam Süre:</Text>{" "}
        {totalServiceDuration} dakika
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.detailTextBold}>Toplam Fiyat:</Text>{" "}
        {totalServicePrice} TL
      </Text>
    </View>
  );
};

const AppoinmentDetails = ({
  appointment,
}: {
  appointment: ActiveAppointmentData;
}) => {
  return (
    <View
      style={[
        styles.detailsContainer,
        {
          flex: 1,
        },
      ]}
    >
      <FlatList
        data={appointment.services}
        renderItem={serviceItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<ListHeaderComponent appointment={appointment} />}
        ListFooterComponent={
          <ListFooterComponent
            totalServiceDuration={appointment.totalEstimatedDuration}
            totalServicePrice={appointment.totalPrice}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  detailsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 25,
    paddingTop: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  detailTextBold: {
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  serviceItem: {
    backgroundColor: colors.grey2,
    padding: 10,
    marginBottom: 10,
  },
  serviceName: {
    color: colors.warning,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AppoinmentDetails;
