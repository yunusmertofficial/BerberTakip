import { setLocation } from "@features/user/userSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLocationDataFromStorage } from "src/utils/locationUtils";

const useCheckLocation = () => {
  const [isLoadingCheckLocation, setIsLoadingCheckLocation] =
    useState<boolean>(true);
  const [errorCheckLocation, setErrorCheckLocation] = useState(null);
  const dispatch = useDispatch();

  const checkLocation = async () => {
    setIsLoadingCheckLocation(true);
    try {
      const location = await getLocationDataFromStorage(); // Define this function or import it
      if (location) {
        dispatch(
          setLocation({
            coordinates: location.coordinates,
            address: location.address,
          })
        );
      }
    } catch (error: any) {
      setErrorCheckLocation(error.message);
    } finally {
      setIsLoadingCheckLocation(false);
    }
  };

  useEffect(() => {
    checkLocation();
  }, []);

  return { isLoadingCheckLocation, errorCheckLocation, checkLocation };
};

export default useCheckLocation;
