import { BaseActiveAppointment } from "./ActiveAppointmentData";

export interface WaitingWalkInAppointment extends BaseActiveAppointment {
  status: "waiting";
  source: "walk-in";
  estimatedStartTime: Date;
  queueNumber: number;
}

export interface WaitingScheduleAppointment extends BaseActiveAppointment {
  status: "waiting";
  source: "schedule";
  estimatedStartTime: Date;
  queueNumber: number;
  scheduledStartTime: Date;
}
