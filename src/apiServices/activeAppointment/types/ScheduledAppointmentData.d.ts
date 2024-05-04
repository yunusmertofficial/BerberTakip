import { BaseActiveAppointment } from "./ActiveAppointmentData";

export interface ScheduledAppointmentData extends BaseActiveAppointment {
  status: "scheduled";
  scheduledStartTime: Date;
  source: "schedule";
}
