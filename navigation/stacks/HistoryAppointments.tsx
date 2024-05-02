import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HistoryAppointmentDetailsScreen from "../../src/screens/HistoryAppointmentDetailsScreen";
import HistoryAppointmentsScreen from "../../src/screens/HistoryAppointmentsScreen";
import HistoryStackParamList from "../../src/types/navigation/stacks/HistoryAppointments";

const Stack = createNativeStackNavigator<HistoryStackParamList>();

const HistoryAppointmentsStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HistoryAppointments"
        component={HistoryAppointmentsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HistoryAppointmentDetails"
        component={HistoryAppointmentDetailsScreen}
        options={{ headerShown: true, title: "Randevu Detayları" }}
      />
    </Stack.Navigator>
  );
};

export default HistoryAppointmentsStackScreen;
