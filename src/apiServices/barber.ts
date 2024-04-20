import api from "./api";

const fetchBarbers = async () => {
  try {
    /*     const response = await api.get("barbers");
    return response.data; */

    const data = [
      {
        id: 1,
        name: "Berber Fatih",
        location: "Toki Kayabaşı Konutları,Başakşehir/İstanbul",
        stars: 4,
        reviews: 20,
        latitude: 41.105402433528305,
        longitude: 28.75646534427912,
      },
      {
        id: 2,
        name: "Berber 2",
        location: "Safir Sitesi, Kayaşehir",
        stars: 5,
        reviews: 30,
        latitude: 41.105812931786566,
        longitude: 28.756585982472718,
      },
    ];

    return data;
  } catch (error: any) {
    throw new Error("Berberler getirilirken bir hata oluştu: " + error.message);
  }
};

export { fetchBarbers };
