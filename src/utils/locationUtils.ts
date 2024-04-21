import * as Location from "expo-location";
import { wait } from ".";

const getLocationCoords = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      throw new Error("Konum izni reddedildi.");
    }

    // 2 sanyie bekletmemizin sebebi kullanıcının izin verdikten hemen sonra okursak hata alabiliyoruz.
    await wait(2000);

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
