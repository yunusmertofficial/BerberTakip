import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Address {
  city?: string | null;
  country?: string | null;
  district?: string | null;
  isoCountryCode?: string | null;
  name?: string | null;
  postalCode?: string | null;
  region?: string | null;
  street?: string | null;
  subregion?: string | null;
  formattedAddress?: string | null;
  timezone?: string | null;
}

const getCurrentPositionAsync = async (): Promise<Coordinates> => {
  try {
    const location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error("Konum bilgilerine erişilemedi: ", error);
    throw new Error("Konum bilgilerine erişilemedi.");
  }
};

const getLocationCoords = async (): Promise<Coordinates> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Konum izni reddedildi.");
    }
    return getCurrentPositionAsync();
  } catch (error: any) {
    console.error("Konum izin hatası: ", error);
    throw new Error(error.message);
  }
};

const getAddressFromCoordinates = async (
  latitude: number,
  longitude: number
): Promise<Address> => {
  try {
    const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (geocode.length > 0) {
      return geocode[0];
    }
    throw new Error("Adres bilgisi bulunamadı.");
  } catch (error) {
    console.error("Adres dönüşüm hatası: ", error);
    throw new Error("Adres dönüşümü yapılamadı.");
  }
};

export const getLocation = async (): Promise<{
  coordinates: Coordinates;
  address: Address;
}> => {
  try {
    const coordinates = await getLocationCoords();
    const address = await getAddressFromCoordinates(
      coordinates.latitude,
      coordinates.longitude
    );
    return {
      coordinates,
      address,
    };
  } catch (error: any) {
    console.error("Konum veya adres bilgisi alınamadı: ", error);
    throw new Error(error.message);
  }
};

// Koordinatları ve adresi AsyncStorage'e kaydetme
export const saveLocationData = async () => {
  try {
    const { coordinates, address } = await getLocation();
    const jsonCoordinates = JSON.stringify(coordinates);
    const jsonAddress = JSON.stringify(address);
    await AsyncStorage.setItem("userCoordinates", jsonCoordinates);
    await AsyncStorage.setItem("userAddress", jsonAddress);
    return { coordinates, address };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getLocationDataFromStorage = async () => {
  try {
    const jsonCoordinates = await AsyncStorage.getItem("userCoordinates");
    const jsonAddress = await AsyncStorage.getItem("userAddress");
    if (jsonCoordinates && jsonAddress) {
      return {
        coordinates: JSON.parse(jsonCoordinates),
        address: JSON.parse(jsonAddress),
      };
    }
    return null;
  } catch (error) {
    console.error("Error getting location data", error);
    return null;
  }
};
// Path: src/utils/index.ts
