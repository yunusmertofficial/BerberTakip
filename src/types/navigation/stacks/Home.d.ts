import { FilterState } from "src/types/FormValues/Home/Filter";

type HomeStackParamList = {
  Home: {
    searchQuery?: string;
    filters?: FilterState;
  };
  Map: {
    filters?: FilterState;
    searchQuery?: string;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  BarberProfile: {
    barberId: number;
  };
};
export default HomeStackParamList;
