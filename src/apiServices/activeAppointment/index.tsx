import ActiveAppointmentData from "./types/ActiveAppointmentData";

export const fetchActiveAppointment =
  async (): Promise<ActiveAppointmentData> => {
    const services = [
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
    ];

    const personnel = {
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
    };

    const appointment = {
      id: 1,
      appointmentNumber: "123456",
      totalPrice: 100,
      services,
      personnel,
      totalEstimatedDuration: 60,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const source = "appointment";

    const InProgressAppointment = {
      walkIn: {
        ...appointment,
        status: "in-progress",
        startTime: new Date(),
        checkInTime: new Date(),
        source: "walk-in",
        confirmationTime: new Date(),
      },
      appointment: {
        ...appointment,
        status: "in-progress",
        startTime: new Date(),
        scheduledStartTime: new Date(),
        source: "appointment", //appointment yerine schedule olmalı
        confirmationTime: new Date(),
      },
    };

    const confirmedAppointment = {
      walkIn: {
        ...appointment,
        services,
        personnel,
        status: "confirmed",
        checkInTime: new Date(),
        source: "walk-in",
        confirmationTime: new Date(),
        totalWaitDuration: 10,
      },
      appointment: {
        ...appointment,
        status: "confirmed",
        scheduledStartTime: new Date(),
        source: "appointment",
        confirmationTime: new Date(),
        totalWaitDuration: 10,
      },
    };

    const scheduledAppointment = {
      ...appointment,
      status: "scheduled",
      scheduledStartTime: new Date(),
    };

    const waitingAppointment = {
      walkIn: {
        ...appointment,
        services,
        personnel,
        status: "waiting",
        source: "walk-in",
        estimatedStartTime: new Date(),
        queueNumber: 1,
      },
      appointment: {
        ...appointment,
        services,
        personnel,
        status: "waiting",
        source: "appointment",
        queueNumber: 1,
        estimatedStartTime: new Date(),
        scheduledStartTime: new Date(),
      },
    };

    const awaitingConfirmationAppointment = {
      walkIn: {
        ...appointment,
        status: "awaiting-confirmation",
        source: "walk-in",
      },
      appointment: {
        ...appointment,
        status: "awaiting-confirmation",
        source: "appointment",
        scheduledStartTime: new Date(),
      },
    };

    return InProgressAppointment[source] as ActiveAppointmentData;
  };
