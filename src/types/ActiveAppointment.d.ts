import Personnel from "./Personnel";
import Service from "./Service";
import Rating from "./Rating";

export enum AppointmentStatus {
  SCHEDULED = "scheduled",
  WAITING = "waiting",
  AWAITING_CONFIRMATION = "awaiting-confirmation",
  IN_PROGRESS = "in-progress",
  CONFIRMED = "confirmed",
}

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
  status: AppointmentStatus;
  confirmationTime?: Date; // Optional for awaiting-confirmation status
  source?: "schedule" | "walk-in"; // Optional for scheduled appointments
  createdAt: Date;
  updatedAt: Date;
}

export default ActiveAppointment;
