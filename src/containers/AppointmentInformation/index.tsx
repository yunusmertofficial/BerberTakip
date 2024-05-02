import React, { useEffect, useState } from "react";
import { Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import ScheduledAppointmentInformation from "./components/ScheduledAppointmentInformation";
import LoadingBoundary from "@components/LoadingBoundary";
import ErrorBoundary from "@components/ErrorBoundary";
import InProgressAppointmentInformation from "./components/InProgressAppointmentInformation";

export enum AppointmentStatus {
  InQueue = "In Queue", // Müşteri sıradadır ve sıra numarası ile beklemektedir.
  Appointment = "Appointment", // Müşteri randevusu b
  InQueueWithAppointment = "In Queue with Appointment", // Müşteri, randevu alarak sıradadır ama sıra numarası yerine randevu saati ile sıralıdır.
  AwaitingBarberConfirmation = "Awaiting Barber Confirmation", // Berber tarafından onay beklenmektedir.
  ConfirmedByBarber = "Confirmed by Barber", // Berber tarafından onaylanmıştır.
}

export interface AppointmentType {
  appointmentNumber: string;
  barberName: string;
  personnelName: string;
  appointmentCoordinates: {
    latitude: number;
    longitude: number;
  };
  appointmentLocation: string;
  queueNumber: number;
  data: {
    type: "Pending" | "In Progress";
    scheduledAppointmentTime?: Date;
    inProgress: {
      startedAt: Date;
    };
    pending: {
      status: AppointmentStatus;
      estimatedTime: Date;
      waitingTimeInMinutes: number; // Müşterinin bekletilme süresi (dakika)
      confirmationTime: Date; // Müşterinin randevusunun onaylandığı zaman
    };
    services: Service[];
  };
}

export interface Service {
  serviceName: string;
  servicePrice: number;
  serviceDuration: number;
}

const AppointmentInformationContainer: React.FC = () => {
  const [appointment, setAppointment] = useState<AppointmentType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchAppointmentInformation = async () => {
    try {
      setIsLoading(true);
      const appointmentInProgress: AppointmentType = {
        appointmentNumber: "A002",
        queueNumber: 2,
        barberName: "Berber2",
        appointmentLocation: "Berber Shop",
        appointmentCoordinates: {
          latitude: 41.105402433528305,
          longitude: 28.75646534427912,
        },
        personnelName: "Jane Doe",
        data: {
          type: "In Progress",
          scheduledAppointmentTime: new Date("2024-04-25T18:00:00"),
          inProgress: {
            startedAt: new Date("2024-04-25T18:40:00"),
          },
          pending: {
            status: AppointmentStatus.ConfirmedByBarber,
            estimatedTime: new Date("2024-04-25T18:40:00"),
            waitingTimeInMinutes: 20,
            confirmationTime: new Date("2024-04-25T18:20:00"),
          },
          services: [
            {
              serviceName: "Saç Kesimi",
              servicePrice: 50,
              serviceDuration: 30,
            },
            {
              serviceName: "Sakal Tıraşı",
              servicePrice: 30,
              serviceDuration: 20,
            },
          ],
        },
      };
      setAppointment(appointmentInProgress);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointmentInformation();
  }, []);

  function calculateEstimatedEndTime(
    startTime: Date | undefined,
    services: Service[]
  ): Date {
    const effectiveStartTime = startTime || new Date();
    const totalServiceTime = services.reduce(
      (total, service) => total + service.serviceDuration,
      0
    );
    return new Date(effectiveStartTime.getTime() + totalServiceTime * 60000);
  }

  return (
    <LoadingBoundary isLoading={isLoading}>
      <ErrorBoundary
        title="Randevu Bilgileri Yüklenirken Bir Hata Oluştu"
        error={errorMessage}
        resetError={fetchAppointmentInformation}
        isErrored={!!errorMessage}
      >
        {appointment?.data?.type === "Pending" && (
          <ScheduledAppointmentInformation appointment={appointment} />
        )}
        {appointment?.data?.type === "In Progress" && (
          <InProgressAppointmentInformation
            barberName={appointment.barberName}
            personnelName={appointment.personnelName}
            startedAt={appointment.data.inProgress?.startedAt || new Date()}
            estimatedEndTime={calculateEstimatedEndTime(
              appointment.data.inProgress?.startedAt,
              appointment.data.services
            )}
          />
        )}
        {Object.keys(appointment || {}).length === 0 && (
          <View
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              h4
              style={{
                textAlign: "center",
              }}
            >
              Henüz randevu bilgileriniz bulunmamaktadır.
            </Text>
          </View>
        )}
      </ErrorBoundary>
    </LoadingBoundary>
  );
};

const styles = StyleSheet.create({});

export default AppointmentInformationContainer;
