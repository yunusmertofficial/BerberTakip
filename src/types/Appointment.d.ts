import Rating from "./Rating";
import Personnel from "./Personnel";

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
