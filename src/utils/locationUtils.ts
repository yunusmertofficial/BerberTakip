import * as Location from "expo-location";

const getCurrentPositionAsync = async () => {
  try {
    const location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    throw new Error("Konum bilgilerine erişilemedi.");
  }
};

const getLocationCoords = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      throw new Error("Konum izni reddedildi.");
    }

    let coords = await getCurrentPositionAsync();

    return coords;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getLocationCoords;
