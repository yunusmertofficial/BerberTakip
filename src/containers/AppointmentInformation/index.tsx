import React, { useEffect, useState } from "react";
import { Text } from "@rneui/themed";
import { Button, StyleSheet, View } from "react-native";
import ScheduledAppointmentInformation from "./components/ScheduledAppointmentInformation";
import LoadingBoundary from "@components/LoadingBoundary";
import ErrorBoundary from "@components/ErrorBoundary";
import { fetchActiveAppointment } from "@apiServices/activeAppointment";
import ActiveAppointmentData from "@apiServices/activeAppointment/types/ActiveAppointmentData";

const AppointmentInformationContainer: React.FC = () => {
  const [appointment, setAppointment] = useState<ActiveAppointmentData | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [value, setValue] = useState<number>(1);

  const fetchAppointmentInformation = async () => {
    try {
      setIsLoading(true);
      const data = await fetchActiveAppointment(value);
      setAppointment(data);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointmentInformation();
  }, [value]);

  return (
    <LoadingBoundary isLoading={isLoading}>
      <ErrorBoundary
        title="Randevu Bilgileri Yüklenirken Bir Hata Oluştu"
        error={errorMessage}
        resetError={fetchAppointmentInformation}
        isErrored={!!errorMessage}
      >
        {!appointment ? (
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
        ) : (
          <ScheduledAppointmentInformation appointment={appointment} />
        )}
        <Button
          onPress={() => {
            //value en fazla 8 olabilir eğer 8 olduysa yeniden 0 yap
            if (value === 8) {
              setValue(0);
            } else {
              setValue(value + 1);
            }
          }}
          title="Yeni bir duruma geç"
        />
      </ErrorBoundary>
    </LoadingBoundary>
  );
};

const styles = StyleSheet.create({});

export default AppointmentInformationContainer;
