import * as Location from "expo-location";
const getLocationCoords = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      throw new Error("Konum izni reddedildi.");
    }

    const location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    throw new Error("Konum bilgilerine erişilemedi.");
  }
};

export default getLocationCoords;
