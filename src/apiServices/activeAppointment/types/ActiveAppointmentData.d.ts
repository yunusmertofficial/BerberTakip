import Personnel from "src/types/Personnel";
import Service from "src/types/Service";
import Rating from "src/types/Rating";

interface ActiveAppointment {
  id: number;
  appointmentNumber: string;
  totalPrice: number;
  totalEstimatedDuration: number;
  services: Service[];
  personnel: Personnel;
  checkInTime?: Date; // Optional for scheduled appointments
  scheduledStartTime?: Date; // Optional for queue appointments
  startTime?: Date; //eğer status inprogress ise işleme başlama saatini gösterir
  queueNumber?: number;
  estimatedStartTime?: Date;
  totalWaitDuration?: number;
  confirmationTime?: Date; // Optional for awaiting-confirmation status
  status:
    | "scheduled"
    | "waiting"
    | "awaiting-confirmation"
    | "confirmed"
    | "in-progress";
  source?: "schedule" | "walk-in"; // Optional for scheduled appointments
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseActiveAppointment {
  id: number;
  appointmentNumber: string;
  totalPrice: number;
  totalEstimatedDuration: number;
  services: Service[];
  personnel: Personnel;
  createdAt: Date;
  updatedAt: Date;
}

export default ActiveAppointment;
