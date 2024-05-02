import HomeStackParamList from "../stacks/Home";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type BarberProfileScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  "BarberProfile",
  "HomeStack"
>;

export default BarberProfileScreenProps;
