import React from "react";
import { Tab, TabView } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { colors } from "../../../../utils";
import AppoinmentKey from "./AppoinmentKey";
import AppoinmentDetails from "./AppoinmentDetails";
import ActiveAppointmentData from "@apiServices/activeAppointment/types/ActiveAppointmentData";
import InProgressAppointmentInformation from "../InProgressAppointmentInformation";

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
          {appointment.status === "in-progress" ? (
            <InProgressAppointmentInformation
              barberName={appointment.personnel.barber?.name}
              personnelName={
                appointment.personnel.firstName +
                " " +
                appointment.personnel.lastName
              }
              startedAt={appointment.startTime}
            />
          ) : (
            <AppoinmentKey appointment={appointment} />
          )}
        </TabView.Item>
        <TabView.Item
          style={{ backgroundColor: colors.background, width: "100%" }}
        >
          <AppoinmentDetails appointment={appointment} />
        </TabView.Item>
      </TabView>
    </>
  );
};

const styles = StyleSheet.create({});

export default ScheduledAppointmentInformation;
