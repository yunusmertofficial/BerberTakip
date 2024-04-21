import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchBarbers } from "../apiServices/barber";
import { Barber } from "../types";
import getLocationCoords from "../utils/locationUtils";
import { setLocation } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";

// Berberlerin tipini ve diğer durumları içeren bir arayüz oluşturuyoruz
interface BarbersContextType {
  barbers: Barber[] | { id: number }[]; // Bu kısmı düzeltin
  isLoading: boolean;
  errorMsg: string | null;
  fetchData: () => Promise<void>;
}

// Başlangıç durumları
const initialBarbersContext: BarbersContextType = {
  barbers: [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ],
  isLoading: true,
  errorMsg: null,
  fetchData: async () => {},
};

// Context'i oluşturuyoruz
const BarbersContext = createContext<BarbersContextType>(initialBarbersContext);

// Context'i kullanacak bir provider bileşeni oluşturuyoruz
export const BarbersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [barbers, setBarbers] = useState<Barber[] | { id: number }[]>(
    initialBarbersContext.barbers
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(initialBarbersContext.isLoading);
  const [errorMsg, setErrorMsg] = useState<string | null>(
    initialBarbersContext.errorMsg
  );

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      console.log("fetchData");
      const coords = await getLocationCoords();
      dispatch(setLocation(coords));
      const barbers = await fetchBarbers();
      setBarbers(barbers);
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BarbersContext.Provider
      value={{ barbers, isLoading, errorMsg, fetchData }}
    >
      {children}
    </BarbersContext.Provider>
  );
};

// Custom hook kullanarak context'i kullanmak için bir kısayol oluşturuyoruz
export const useBarbers = () => useContext(BarbersContext);
