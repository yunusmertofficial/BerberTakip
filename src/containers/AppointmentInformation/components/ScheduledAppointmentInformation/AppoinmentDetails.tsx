import React from "react";
import { FlatList, Linking, StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";
import { colors } from "../../../../utils";
import { Button } from "@rneui/base";
import Service from "src/types/Service";

const serviceItem = ({ item }: { item: Service }) => (
  <View style={styles.serviceItem}>
    <Text style={styles.serviceName}>{item.name}</Text>
    <Text>Price: ${item.price}</Text>
    <Text>Duration: {item.estimatedDuration} minutes</Text>
  </View>
);

const ListHeaderComponent = ({
  appointmentNumber,
  barberName,
  personnelName,
  scheduledAppointmentTime,
  estimatedTime,
  appointmentLocation,
  appointmentCoordinates,
}: {
  appointmentNumber: string;
  barberName: string;
  personnelName: string;
  estimatedTime?: Date;
  scheduledAppointmentTime?: Date;
  appointmentLocation: string;
  appointmentCoordinates: { latitude: number; longitude: number };
}) => {
  return (
    <View>
      <Text style={styles.detailText}>
        <Text style={styles.detailTextBold}>Randevu Numarası:</Text>{" "}
        {appointmentNumber}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.detailTextBold}>Berber Adı:</Text> {barberName}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.detailTextBold}>Hizmet Sağlayıcı:</Text>{" "}
        {personnelName}
      </Text>
      {scheduledAppointmentTime && (
        <Text style={styles.detailText}>
          <Text style={styles.detailTextBold}>Randevu Zamanı:</Text>{" "}
          {scheduledAppointmentTime.toLocaleString()}
        </Text>
      )}
      {estimatedTime && (
        <Text style={styles.detailText}>
          <Text style={styles.detailTextBold}>Tahmini Başlangıç Zamanı:</Text>{" "}
          {estimatedTime.toLocaleString()}
        </Text>
      )}
      <Text style={styles.detailText}>
        <Text style={styles.detailTextBold}>Kısa Adres:</Text>{" "}
        {appointmentLocation}
      </Text>

      <Button
        title="Yol Tarifi Al"
        onPress={() => {
          const { latitude, longitude } = appointmentCoordinates;
          const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
          Linking.openURL(url);
        }}
      />
      <Text style={styles.title}>Hizmetler</Text>
    </View>
  );
};

const ListFooterComponent = ({
  totalServiceDuration,
  totalServicePrice,
}: {
  totalServiceDuration: number;
  totalServicePrice: number;
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text style={styles.detailText}>
        <Text style={styles.detailTextBold}>Toplam Süre:</Text>{" "}
        {totalServiceDuration} dakika
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.detailTextBold}>Toplam Fiyat:</Text>{" "}
        {totalServicePrice} TL
      </Text>
    </View>
  );
};

const AppoinmentDetails = ({
  services,
  appointmentNumber,
  barberName,
  personnelName,
  scheduledAppointmentTime,
  estimatedTime,
  appointmentLocation,
  appointmentCoordinates,
}: {
  services: Service[];
  appointmentNumber: string;
  barberName: string;
  personnelName: string;
  scheduledAppointmentTime?: Date;
  estimatedTime?: Date;
  appointmentLocation: string;
  appointmentCoordinates: { latitude: number; longitude: number };
}) => {
  return (
    <View
      style={[
        styles.detailsContainer,
        {
          flex: 1,
        },
      ]}
    >
      <FlatList
        data={services}
        renderItem={serviceItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <ListHeaderComponent
            appointmentNumber={appointmentNumber}
            barberName={barberName}
            personnelName={personnelName}
            scheduledAppointmentTime={scheduledAppointmentTime}
            estimatedTime={estimatedTime}
            appointmentLocation={appointmentLocation}
            appointmentCoordinates={appointmentCoordinates}
          />
        }
        ListFooterComponent={
          <ListFooterComponent
            totalServiceDuration={services.reduce(
              (acc, curr) => acc + curr.estimatedDuration,
              0
            )}
            totalServicePrice={services.reduce(
              (acc, curr) => acc + curr.price,
              0
            )}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  detailsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 25,
    paddingTop: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  detailTextBold: {
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  serviceItem: {
    backgroundColor: colors.grey2,
    padding: 10,
    marginBottom: 10,
  },
  serviceName: {
    color: colors.warning,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AppoinmentDetails;
