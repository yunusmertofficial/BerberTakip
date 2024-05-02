/* import AppointmentResult, {
  AppointmentResultType,
} from "../../types/AppointmentResult"; */
import AppointmentResult from "../../types/AppointmentResult";
import AppointmentResultData from "./types/AppointmentResultData";

const appointmentsResults: AppointmentResult[] = [
  {
    id: 1,
    type: "Completed",
    appointmentNumber: "202404230001",
    totalPrice: 85,
    totalDuration: 120,
    completedServices: [
      {
        service: {
          id: 1,
          name: "Saç Kesimi",
          price: 40,
          estimatedDuration: 30,
        },
        duration: 30,
      },
      {
        service: { id: 2, name: "Tıraş", price: 25, estimatedDuration: 30 },
        duration: 30,
      },
      {
        service: {
          id: 3,
          name: "Sakal Tıraşı",
          price: 20,
          estimatedDuration: 60,
        },
        duration: 60,
      },
    ],
    startDate: new Date("2024-04-23T15:00"),
    endDate: new Date("2024-04-24T18:00"),
    checkInTime: new Date("2024-04-23T15:00"),
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
    createdAt: new Date("2024-04-23T15:00"),
    updatedAt: new Date("2024-04-24T18:00"),
  },
];

export const fetchAppointmentResults = (): AppointmentResultData[] => {
  return appointmentsResults.map((appointmentResult) => {
    return {
      id: appointmentResult.id,
      type: appointmentResult.type,
      appointmentNumber: appointmentResult.appointmentNumber,
      totalPrice: appointmentResult.totalPrice,
      personnel: appointmentResult.personnel,
      startDate: appointmentResult.startDate,
      endDate: appointmentResult.endDate,
      rating: appointmentResult.rating,
      totalDuration: appointmentResult.totalDuration,
      completedServices: appointmentResult.completedServices,
      cancelledServices: appointmentResult.cancelledServices,
      reason: appointmentResult.reason,
      estimatedStartDate: appointmentResult.estimatedStartDate,
      checkInTime: appointmentResult.checkInTime,
      missedServices: appointmentResult.missedServices,
      scheduledStartDate: appointmentResult.scheduledStartDate,
      totalEstimatedDuration: appointmentResult.totalEstimatedDuration,
    };
  });
};

export const fetchAppointmentResult = (id: number): AppointmentResultData => {
  const appointmentResult = appointmentsResults.find(
    (appointmentResult) => appointmentResult.id == id
  ) as AppointmentResult;

  return {
    id: appointmentResult?.id,
    type: appointmentResult?.type,
    appointmentNumber: appointmentResult?.appointmentNumber,
    totalPrice: appointmentResult?.totalPrice,
    personnel: appointmentResult?.personnel,
    startDate: appointmentResult?.startDate,
    endDate: appointmentResult?.endDate,
    rating: appointmentResult?.rating,
    totalDuration: appointmentResult?.totalDuration,
    completedServices: appointmentResult?.completedServices,
    cancelledServices: appointmentResult?.cancelledServices,
    reason: appointmentResult?.reason,
    estimatedStartDate: appointmentResult?.estimatedStartDate,
    checkInTime: appointmentResult?.checkInTime,
    missedServices: appointmentResult?.missedServices,
    scheduledStartDate: appointmentResult?.scheduledStartDate,
    totalEstimatedDuration: appointmentResult?.totalEstimatedDuration,
  };
};
