import Barber from "../types/Barber";
import api from "./api";

const fetchBarbers = async (ids?: number[]) => {
  try {
    /*     const response = await api.get("barbers");
    return response.data; */

    const data: Barber[] = [
      {
        id: 1,
        name: "Barber Shop",
        location: "İstanbul",
        stars: 4.5,
        reviews: 125,
        latitude: 41.0082,
        longitude: 28.9784,
        rating: 4.5,
        completed_appointments: 1250,
        personnels: [
          {
            id: 1,
            firstName: "John",
            lastName: "Doe",
          },
          {
            id: 2,
            firstName: "Jane",
            lastName: "Doe",
          },
        ],
        services: [
          {
            id: 1,
            name: "Haircut",
            estimatedDuration: 30,
            price: 20,
          },
          {
            id: 2,
            name: "Beard Trim",
            estimatedDuration: 15,
            price: 10,
          },
        ],

        ratings: [
          {
            id: 1,
            comment: "Great service!",
            ratingValue: 5,
            date: new Date("2024-04-23T15:00"),
          },
          {
            id: 2,
            comment: "I loved it!",
            ratingValue: 5,
            date: new Date("2024-04-23T15:00"),
          },
        ],
      },
      {
        id: 2,
        name: "Barber Shop 2",
        location: "İstanbul",
        stars: 4.5,
        reviews: 125,
        latitude: 41.0082,
        longitude: 28.9784,
        rating: 4.5,
        completed_appointments: 1250,
        personnels: [
          {
            id: 1,
            firstName: "John",
            lastName: "Doe",
          },
          {
            id: 2,
            firstName: "Jane",
            lastName: "Doe",
          },
        ],
        services: [
          {
            id: 1,
            name: "Haircut",
            estimatedDuration: 30,
            price: 20,
          },
          {
            id: 2,
            name: "Beard Trim",
            estimatedDuration: 15,
            price: 10,
          },
        ],
        ratings: [
          {
            id: 1,
            comment: "Great service!",
            ratingValue: 5,
            date: new Date("2024-04-23T15:00"),
          },
          {
            id: 2,
            comment: "I loved it!",
            ratingValue: 5,
            date: new Date("2024-04-23T15:00"),
          },
        ],
      },
    ];

    if (ids && ids.length > 0) {
      return data.filter((barber) => ids.includes(barber.id));
    }

    return data;
  } catch (error: any) {
    throw new Error("Berberler getirilirken bir hata oluştu: " + error.message);
  }
};

export { fetchBarbers };
