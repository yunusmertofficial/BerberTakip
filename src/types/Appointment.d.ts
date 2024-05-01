import Rating from "./Rating";
import Personnel from "./Personnel";

interface Appointment {
  id: number;
  appointmentNumber: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  totalDuration: number;
  services: Service[];
  rating?: Rating;
  personnel?: Personnel;
}
export default Appointment;
