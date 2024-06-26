import Personnel from "../../../types/Personnel";
import Service from "../../../types/Service";
import Rating from "../../../types/Rating";

export enum AppointmentResultType {
  CANCELLED = "Cancelled",
  COMPLETED = "Completed",
  MISSED = "Missed",
}

interface CompletedAppointmentDetails {
  totalDuration: number;
  completedServices: {
    service: Service;
    duration: number;
  }[];
  startDate: Date;
  endDate: Date;
  rating?: Rating;
}

interface CancelledAppointmentDetails {
  totalEstimatedDuration?: number;
  cancelledServices?: Service[];
  reason?: string;
  estimatedStartDate?: Date;
}

interface MissedAppointmentDetails {
  totalEstimatedDuration?: number;
  missedServices?: Service[];
  reason?: string;
  estimatedStartDate?: Date;
}

interface AppointmentResultData
  extends CompletedAppointmentDetails,
    CancelledAppointmentDetails,
    MissedAppointmentDetails {
  id: number;
  type: AppointmentResultType; // Randevu durumu tipi
  scheduledStartDate?: Date; // Randevu için planlanmış başlangıç zamanı
  checkInTime?: Date; // Walk-in için müşterinin sıra aldığı zaman
  appointmentNumber: string;
  totalPrice: number;
  personnel: Personnel;
}

export default AppointmentResultData;
