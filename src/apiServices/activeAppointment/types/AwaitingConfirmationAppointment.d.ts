import { BaseActiveAppointment } from "./ActiveAppointmentData";

export interface AwaitingConfirmationWalkInAppointment
  extends BaseActiveAppointment {
  status: "awaiting-confirmation";
  source: "walk-in";
}

export interface AwaitingConfirmationScheduleAppointment
  extends BaseActiveAppointment {
  status: "awaiting-confirmation";
  source: "schedule";
  scheduledStartTime: Date;
}
