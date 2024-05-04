import React, { useEffect, useState } from "react";
import { Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import ScheduledAppointmentInformation from "./components/ScheduledAppointmentInformation";
import LoadingBoundary from "@components/LoadingBoundary";
import ErrorBoundary from "@components/ErrorBoundary";
import InProgressAppointmentInformation from "./components/InProgressAppointmentInformation";
import Service from "src/types/Service";
import { fetchActiveAppointment } from "@apiServices/activeAppointment";
import ActiveAppointmentData from "@apiServices/activeAppointment/types/ActiveAppointmentData";

const AppointmentInformationContainer: React.FC = () => {
  const [appointment, setAppointment] = useState<ActiveAppointmentData | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchAppointmentInformation = async () => {
    try {
      setIsLoading(true);
      const data = await fetchActiveAppointment();
      setAppointment(data);
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
      (total, service) => total + service.estimatedDuration,
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
        {(appointment?.status === "scheduled" ||
          appointment?.status === "waiting" ||
          appointment?.status === "awaiting-confirmation" ||
          appointment?.status === "confirmed") && (
          <ScheduledAppointmentInformation appointment={appointment} />
        )}
        {appointment?.status === "in-progress" && (
          <InProgressAppointmentInformation
            barberName={appointment?.personnel?.barber?.name}
            personnelName={`${appointment?.personnel?.firstName} ${appointment?.personnel?.lastName}`}
            startedAt={appointment?.startTime || new Date()}
            estimatedEndTime={calculateEstimatedEndTime(
              appointment?.startTime,
              appointment?.services
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
