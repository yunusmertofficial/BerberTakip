import React, { useState, useEffect } from "react";
import HomeContainer from "../containers/Home";
import { useDispatch } from "react-redux";
import { setLocation } from "../../features/user/userSlice";
import getLocationCoords from "../utils/locationUtils";
import { fetchBarbers } from "../apiServices/barber";
import { Barber } from "../types";

const HomeScreen = () => {
  const dispatch = useDispatch();
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
  const [isLoading, setisLoading] = useState(true);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const fetchData = async () => {
    console.log("fetchData");
    setisLoading(true);
    setErrorMsg(null);
    try {
      const coords = await getLocationCoords();
      dispatch(setLocation(coords));
      const barbers = await fetchBarbers();
      setBarbers(barbers);
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <HomeContainer
      barbers={barbers}
      isLoading={isLoading}
      errorMsg={errorMsg}
      fetchData={fetchData}
    />
  );
};

export default HomeScreen;
