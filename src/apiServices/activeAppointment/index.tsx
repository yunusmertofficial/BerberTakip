import ActiveAppointmentData from "./types/ActiveAppointmentData";

export const fetchActiveAppointment = async () => {
  const appointmentInProgress: ActiveAppointmentData = {
    id: 1,
    appointmentNumber: "123456",
    totalPrice: 100,
    totalEstimatedDuration: 60,
    estimatedStartTime: new Date(),
    services: [
      {
        id: 1,
        name: "Haircut",
        price: 50,
        estimatedDuration: 30,
      },
      {
        id: 2,
        name: "Beard Trim",
        price: 50,
        estimatedDuration: 30,
      },
    ],
    personnel: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      barber: {
        id: 1,
        name: "Barber Shop",
        location: "İstanbul",
        stars: 4.5,
        reviews: 125,
        latitude: 41.0082,
        longitude: 28.9784,
        rating: 4.5,
        completed_appointments: 1250,
      },
    },
    checkInTime: new Date(),
    startTime: new Date(),
    queueNumber: 1,
    status: "confirmed",
    confirmationTime: new Date(),
    scheduledStartTime: new Date(),
    source: "appointment",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return appointmentInProgress;
};
