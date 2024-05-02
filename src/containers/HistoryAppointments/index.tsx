import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@rneui/themed";
import AppointmentCard from "./components/AppointmentCard";
import { colors } from "@utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { fetchAppointmentResults } from "@apiServices/appointmentResult";
import HistoryAppointmentDetailsScreenProps from "src/types/navigation/screens/HistoryAppointmentDetails";

const HistoryAppointmentsContainer = () => {
  const appointments = fetchAppointmentResults();
  const navigation =
    useNavigation<HistoryAppointmentDetailsScreenProps["navigation"]>();
  const handlePress = (appointment_id: number) => {
    navigation.navigate("HistoryAppointmentDetails", { appointment_id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text h4 style={styles.header}>
        Geçmiş Randevularım
      </Text>
      <FlatList
        data={appointments}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id)}>
            <AppointmentCard appointment={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
    textAlign: "center",
    backgroundColor: colors.background,
  },
});

export default HistoryAppointmentsContainer;
