import HistoryAppointmentsStackParamList from "../stacks/HistoryAppointments";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type HistoryAppointmentDetailsScreenProps = NativeStackScreenProps<
  HistoryAppointmentsStackParamList,
  "HistoryAppointmentDetails",
  "HistoryStack"
>;

export default HistoryAppointmentDetailsScreenProps;
