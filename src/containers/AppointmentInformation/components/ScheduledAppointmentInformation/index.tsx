import React from "react";
import { Tab, TabView } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { colors } from "../../../../utils";
import AppoinmentKey from "./AppoinmentKey";
import AppoinmentDetails from "./AppoinmentDetails";
import { AppointmentType } from "../..";

const ScheduledAppointmentInformation = ({
  appointment,
}: {
  appointment: AppointmentType;
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
            scheduledAppointmentTime={
              appointment.scheduled.scheduledAppointmentTime
            }
            appointmentNumber={appointment.appointmentNumber}
            waitingTimeInMinutes={appointment.scheduled.waitingTimeInMinutes}
            confirmationTime={appointment.scheduled.confirmationTime}
            status={appointment.appointmentStatus.status}
          />
        </TabView.Item>
        <TabView.Item
          style={{ backgroundColor: colors.background, width: "100%" }}
        >
          <AppoinmentDetails
            appointmentNumber={appointment.appointmentNumber}
            barberName={appointment.barberName}
            personnelName={appointment.personnelName}
            scheduledAppointmentTime={
              appointment.scheduled.scheduledAppointmentTime
            }
            appointmentLocation={appointment.appointmentLocation}
            appointmentCoordinates={appointment.appointmentCoordinates}
            services={appointment.services}
          />
        </TabView.Item>
      </TabView>
    </>
  );
};

const styles = StyleSheet.create({});

export default ScheduledAppointmentInformation;
