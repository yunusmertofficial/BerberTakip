import Appointment from "./Appointment";
import Personnel from "./Personnel";
import Service from "./Service";
import ExtendedAppointmentInfo from "./ExtendedAppointmentInfo";
import Rating from "./Rating";

// Genel randevu sonucu interface'i, iptal edilmiş, tamamlanmış veya kaçırılmış randevular için kullanılır.
interface AppointmentOutcome {
  id: number;
  type: "Cancelled" | "Completed" | "Missed"; // Randevu durumu tipi
  appointment: Appointment; // Genel randevu yapısına referans
  details: {
    scheduledTime?: Date; // Appointment için planlanmış zaman
    checkInTime?: Date; // Walk-in için müşterinin giriş yaptığı zaman
    estimatedTime: Date; // Randevunun tahmini süresi
  }; // Randevuyla ilgili ek bilgiler
  reason?: string; // İptal veya kaçırılma sebebi (isteğe bağlı)
  feedback?: Rating; // Tamamlanmış randevularda müşteri geri bildirimi (isteğe bağlı)
  createdAt: Date; // Randevunun oluşturulma tarihi
  updatedAt: Date; // Son güncelleme tarihi
}

export default AppointmentOutcome;
