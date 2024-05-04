import { BaseActiveAppointment } from "./ActiveAppointmentData";

export interface ConfirmedWalkInAppointment extends BaseActiveAppointment {
  status: "confirmed";
  checkInTime: Date;
  source: "walk-in";
  confirmationTime: Date;
  totalWaitDuration: number;
}

export interface ConfirmedScheduleAppointment extends BaseActiveAppointment {
  status: "confirmed";
  scheduledStartTime: Date;
  source: "schedule";
  confirmationTime: Date;
  totalWaitDuration: number;
}
