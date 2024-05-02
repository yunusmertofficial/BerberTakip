import HistoryAppointmentsStackParamList from "../stacks/HistoryAppointments";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type HistoryAppointmentsScreenProps = NativeStackScreenProps<
  HistoryAppointmentsStackParamList,
  "HistoryAppointments",
  "HistoryStack"
>;
export default HistoryAppointmentsScreenProps;
