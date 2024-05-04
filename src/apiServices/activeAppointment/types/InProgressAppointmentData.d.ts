import { BaseActiveAppointment } from "./ActiveAppointmentData";

export interface InProgressWalkInAppointment extends BaseActiveAppointment {
  status: "in-progress";
  startTime: Date;
  checkInTime: Date;
  source: "walk-in";
  confirmationTime: Date;
}

export interface InProgressScheduleAppointment extends BaseActiveAppointment {
  status: "in-progress";
  startTime: Date;
  scheduledStartTime: Date;
  source: "schedule";
  confirmationTime: Date;
}
