import React from "react";
import { Tab, TabView } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { colors } from "../../../../utils";
import AppoinmentKey from "./AppoinmentKey";
import AppoinmentDetails from "./AppoinmentDetails";
import ActiveAppointmentData from "@apiServices/activeAppointment/types/ActiveAppointmentData";

const ScheduledAppointmentInformation = ({
  appointment,
}: {
  appointment: ActiveAppointmentData;
}) => {
  const [index, setIndex] = React.useState(0);
  return (
    <>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "white",
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item
          title="Randevu Anahtar"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "qr-code", type: "ionicon", color: "white" }}
        />
        <Tab.Item
          title="Randevu Detayları"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "information-circle", type: "ionicon", color: "white" }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item
          style={{ backgroundColor: colors.background, width: "100%" }}
        >
          <AppoinmentKey
            queueNumber={appointment.queueNumber}
            scheduledAppointmentTime={appointment.scheduledStartTime}
            estimatedTime={appointment.estimatedStartTime}
            appointmentNumber={appointment.appointmentNumber}
            waitingTimeInMinutes={appointment.totalEstimatedDuration}
            confirmationTime={appointment.confirmationTime}
            status={appointment.status}
          />
        </TabView.Item>
        <TabView.Item
          style={{ backgroundColor: colors.background, width: "100%" }}
        >
          <AppoinmentDetails
            appointmentNumber={appointment.appointmentNumber}
            barberName={appointment.personnel.barber.name}
            personnelName={appointment.personnel.firstName}
            scheduledAppointmentTime={appointment.scheduledStartTime}
            estimatedTime={appointment.estimatedStartTime}
            appointmentLocation={appointment.personnel.barber.location}
            appointmentCoordinates={{
              latitude: appointment.personnel.barber.latitude,
              longitude: appointment.personnel.barber.longitude,
            }}
            services={appointment.services}
          />
        </TabView.Item>
      </TabView>
    </>
  );
};

const styles = StyleSheet.create({});

export default ScheduledAppointmentInformation;
