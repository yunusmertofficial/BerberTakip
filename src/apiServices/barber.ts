import Barber from "../types/Barber";
import api from "./api";

const fetchBarbers = async () => {
  try {
    /*     const response = await api.get("barbers");
    return response.data; */
    const data: Barber[] = [
      {
        id: 1,
        name: "Ahmet Berber",
        location: "İstiklal Caddesi No: 123, Beyoğlu, İstanbul",
        stars: 4.5,
        reviews: 100,
        latitude: 41.105402433528305,
        longitude: 28.75646534427912,
        rating: 4.8,
        completed_appointments: 500,
        services: [
          { id: 1, name: "Saç Kesimi", price: 50 },
          { id: 2, name: "Tıraş", price: 30 },
          { id: 3, name: "Sakal Düzeltme", price: 20 },
        ],
        ratings: [
          {
            id: 1,
            comment: "Çok memnun kaldım, kesinlikle tavsiye ederim!",
            rating: 5,
            date: new Date("2024-04-20"),
          },
          {
            id: 2,
            comment: "Personel çok ilgili, harika bir deneyim.",
            rating: 4.5,
            date: new Date("2024-04-18"),
          },
        ],
      },
      {
        id: 2,
        name: "Mehmet Berber",
        location: "Atatürk Bulvarı No: 456, Kızılay, Ankara",
        stars: 4.2,
        reviews: 80,
        latitude: 41.105402433528305,
        longitude: 28.75646534427912,
        rating: 4.5,
        completed_appointments: 400,
        services: [
          { id: 1, name: "Saç Kesimi", price: 40 },
          { id: 2, name: "Tıraş", price: 25 },
        ],
        ratings: [
          {
            id: 1,
            comment: "Her zaman buradan memnun ayrılıyorum.",
            rating: 4.5,
            date: new Date("2024-04-22"),
          },
          {
            id: 2,
            comment: "Fiyat performans açısından iyi.",
            rating: 4,
            date: new Date("2024-04-19"),
          },
        ],
      },
      {
        id: 3,
        name: "Ayşe Berber",
        location: "Kordonboyu No: 789, Alsancak, İzmir",
        stars: 4.8,
        reviews: 120,
        latitude: 41.105402433528305,
        longitude: 28.75646534427912,
        rating: 4.9,
        completed_appointments: 600,
        services: [
          { id: 1, name: "Saç Kesimi", price: 60 },
          { id: 2, name: "Tıraş", price: 35 },
          { id: 3, name: "Sakal Düzeltme", price: 25 },
        ],
        ratings: [
          {
            id: 1,
            comment: "Hizmet mükemmel, her kuruşa değer.",
            rating: 5,
            date: new Date("2024-04-21"),
          },
          {
            id: 2,
            comment: "Şehrin en iyi berberi!",
            rating: 5,
            date: new Date("2024-04-17"),
          },
        ],
      },
    ];

    return data;
  } catch (error: any) {
    throw new Error("Berberler getirilirken bir hata oluştu: " + error.message);
  }
};

export { fetchBarbers };
