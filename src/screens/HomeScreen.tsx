import { StatusBar } from "react-native";
import HomeContainer from "../containers/Home";
import { BarbersProvider } from "../context/BarbersContext";
import { colors } from "../utils";
import CustomHeader from "@components/CustomHeader";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store";
import Barber from "src/types/Barber";
import { saveLocationData } from "src/utils/locationUtils";
import { setLocation } from "@features/user/userSlice";
import { fetchBarbers } from "@apiServices/barber";
import { FilterState } from "src/types/FormValues/Home/Filter";

const HomeScreen = () => {
  const [barbers, setBarbers] = useState<Barber[] | { id: number }[]>([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    minStars: "2",
    maxDistance: 5,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");

  const coordinates = useSelector(
    (state: RootState) => state.user.location.coordinates
  );

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      console.log({
        filters,
        searchQuery,
      });
      let coords = coordinates;
      if (!coords) {
        const location = await saveLocationData();
        coords = location.coordinates;
        dispatch(setLocation(location));
      }
      const barbers = await fetchBarbers();
      setBarbers(barbers);
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [coordinates]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // useEffect içinde fetchData'yi bağımlılık olarak ekliyoruz.

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="dark-content" />
      <CustomHeader
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
        searchQuery={searchQuery}
      />
      <HomeContainer
        barbers={barbers}
        isLoading={isLoading}
        errorMsg={errorMsg}
        fetchData={fetchData}
      />
    </>
  );
};

export default HomeScreen;
