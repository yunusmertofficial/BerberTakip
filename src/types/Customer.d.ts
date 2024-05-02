import ActiveAppointment from "./ActiveAppointment";
import AppointmentResult from "./AppointmentResult";

interface Customer {
  id: number;
  name: string;
  phoneNumber: string;
  password: string;
  appointmentResults?: AppointmentResult[];
  activeAppointment?: ActiveAppointment;
  createdAt: Date;
  updatedAt: Date;
}

export default Customer;
