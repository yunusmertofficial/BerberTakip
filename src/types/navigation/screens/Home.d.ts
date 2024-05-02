import { NativeStackScreenProps } from "@react-navigation/native-stack";
import HomeStackParamList from "../stacks/Home";
type HomeScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  "Home",
  "HomeStack"
>;
export default HomeScreenProps;
