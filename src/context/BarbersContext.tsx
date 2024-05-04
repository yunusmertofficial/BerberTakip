import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { fetchBarbers } from "../apiServices/barber";
import { setLocation } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Barber from "../types/Barber";
import { RootState } from "../../store";
import { getLocation } from "@utils";
import { FilterState } from "src/types/FormValues/Home/Filter";

// Berberlerin tipini ve diğer durumları içeren bir arayüz oluşturuyoruz
interface BarbersContextType {
  barbers: Barber[] | { id: number }[]; // Bu kısmı düzeltin
  searchQuery: string | null;
  filters?: FilterState;
  isLoading: boolean;
  errorMsg: string | null;
  fetchData: () => Promise<void>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
  setFilters: React.Dispatch<
    React.SetStateAction<
      | {
          minStars: string;
          maxDistance: number;
        }
      | undefined
    >
  >;
  setSearchQuery: React.Dispatch<React.SetStateAction<string | null>>;
}

// Başlangıç durumları
const initialBarbersContext: BarbersContextType = {
  filters: {
    minStars: "2",
    maxDistance: 5,
  },
  searchQuery: "",
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
  setErrorMsg: (value) => {},
  setFilters: (value) => {},
  setSearchQuery: (value) => {},
};

// Context'i oluşturuyoruz
const BarbersContext = createContext<BarbersContextType>(initialBarbersContext);

// Context'i kullanacak bir provider bileşeni oluşturuyoruz
export const BarbersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.log("BarbersProvider rendered");
  const [barbers, setBarbers] = useState<Barber[] | { id: number }[]>(
    initialBarbersContext.barbers
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(initialBarbersContext.isLoading);
  const [errorMsg, setErrorMsg] = useState<string | null>(
    initialBarbersContext.errorMsg
  );
  const [filters, setFilters] = useState(initialBarbersContext.filters);
  const [searchQuery, setSearchQuery] = useState<string | null>(
    initialBarbersContext.searchQuery || null
  );

  const coordinates = useSelector(
    (state: RootState) => state.user.location.coordinates
  );
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      let coords = coordinates;
      if (!coords) {
        const location = await getLocation();
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
  }, [coordinates, filters, searchQuery]); // Bağımlılıklar listesi

  useEffect(() => {
    fetchData();
  }, [fetchData]); // useEffect içinde fetchData'yi bağımlılık olarak ekliyoruz.

  return (
    <BarbersContext.Provider
      value={{
        barbers,
        isLoading,
        errorMsg,
        fetchData,
        setErrorMsg,
        searchQuery,
        filters,
        setFilters,
        setSearchQuery,
      }}
    >
      {children}
    </BarbersContext.Provider>
  );
};

// Custom hook kullanarak context'i kullanmak için bir kısayol oluşturuyoruz
export const useBarbers = () => useContext(BarbersContext);
