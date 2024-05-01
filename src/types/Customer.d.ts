import ActiveAppointment from "./ActiveAppointment";
import AppointmentOutcome from "./AppointmentOutcome";

interface Customer {
  id: number;
  name: string;
  phoneNumber: string;
  password: string;
  appointmentOutcomes?: AppointmentOutcome[];
  activeAppointment?: ActiveAppointment;
  createdAt: Date;
  updatedAt: Date;
}

export default Customer;
