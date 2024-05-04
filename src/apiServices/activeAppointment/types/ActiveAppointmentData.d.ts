import Personnel from "./Personnel";
import Service from "./Service";
import Rating from "./Rating";

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
  confirmationTime?: Date; // Optional for awaiting-confirmation status
  status:
    | "scheduled"
    | "waiting"
    | "awaiting-confirmation"
    | "confirmed"
    | "in-progress";
  source?: "appointment" | "walk-in"; // Optional for scheduled appointments
  createdAt: Date;
  updatedAt: Date;
}

export default ActiveAppointment;
