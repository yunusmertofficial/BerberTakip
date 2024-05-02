import Rating from "./Rating";
import Personnel from "./Personnel";
import Service from "./Service";

interface Appointment {
  id: number;
  appointmentNumber: string;
  totalPrice: number;
  totalDuration: number;
  services: Service[];
  personnel: Personnel;
  createdAt: Date;
  updatedAt: Date;
}
export default Appointment;
