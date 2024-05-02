import Appointment from "./Appointment";
import Personnel from "./Personnel";
import Service from "./Service";
import Rating from "./Rating";

enum AppointmentStatus {
  SCHEDULED = "scheduled",
  WAITING = "waiting",
  AWAITING_CONFIRMATION = "awaiting-confirmation",
  IN_PROGRESS = "in-progress",
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
  status: AppointmentStatus;
  source?: "appointment" | "walk-in"; // Optional for scheduled appointments
  createdAt: Date;
  updatedAt: Date;
}

export default ActiveAppointment;
