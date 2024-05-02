import { NativeStackScreenProps } from "@react-navigation/native-stack";
import HomeStackParamList from "../stacks/Home";
type MapScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  "Map",
  "HomeStack"
>;
export default MapScreenProps;
