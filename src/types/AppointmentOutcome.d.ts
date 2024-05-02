import Appointment from "./Appointment";
import Personnel from "./Personnel";
import Service from "./Service";
import Rating from "./Rating";

enum AppointmentResultType {
  CANCELLED = "Cancelled",
  COMPLETED = "Completed",
  MISSED = "Missed",
}

interface CompletedAppointmentDetails {
  totalDuration: number;
  services: {
    service: Service;
    duration: number;
  }[];
  startTime: Date;
  endTime: Date;
  rating?: Rating;
}

interface CancelledAppointmentDetails {
  totalEstimatedDuration: number;
  services: Service[];
  reason: string;
  estimatedStartTime: Date;
}

interface MissedAppointmentDetails {
  totalEstimatedDuration: number;
  services: Service[];
  reason: string;
  estimatedStartTime: Date;
}

interface AppointmentResult {
  id: number;
  type: AppointmentResultType; // Randevu durumu tipi
  scheduledStartTime?: Date; // Randevu için planlanmış başlangıç zamanı
  checkInTime?: Date; // Walk-in için müşterinin sıra aldığı zaman
  appointmentNumber: string;
  totalPrice: number;
  personnel: Personnel;
  details:
    | CompletedAppointmentDetails
    | CancelledAppointmentDetails
    | MissedAppointmentDetails;
  createdAt: Date; // Randevunun oluşturulma tarihi
  updatedAt: Date; // Son güncelleme tarihi
}

export default AppointmentResult;
