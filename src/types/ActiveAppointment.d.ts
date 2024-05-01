import Appointment from "./Appointment";
import Personnel from "./Personnel";
import Service from "./Service";
import Rating from "./Rating";

interface ActiveAppointment {
  id: number;
  appointment: Appointment;
  checkInTime?: Date; // Optional for scheduled appointments
  scheduledTime?: Date; // Optional for queue appointments
  status: "waiting" | "in-progress" | "awaiting-confirmation" | "scheduled";
  source?: "appointment" | "walk-in"; // Optional for scheduled appointments
  createdAt: Date;
  updatedAt: Date;
}

export default ActiveAppointment;
