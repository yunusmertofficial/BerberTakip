import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import { colors } from "@utils";
import Service from "./components/Service";
import Review from "./components/Review";
import Header from "./components/Header";
import Location from "./components/Location";
import { useRoute } from "@react-navigation/native";
import { fetchBarbers } from "@apiServices/barber";
import LoadingBoundary from "@components/LoadingBoundary";
import ErrorBoundary from "@components/ErrorBoundary";
import BarberProfileScreenProps from "src/types/navigation/screens/BarberProfile";
import Barber from "src/types/Barber";

const BarberProfileContainer: React.FC = () => {
  const route = useRoute<BarberProfileScreenProps["route"]>();
  const { barberId } = route.params;
  const [barber, setBarber] = useState<Barber | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!barberId) return;

    const fetchBarberData = async () => {
      setErrorMessage(null);
      try {
        const barbers = await fetchBarbers();
        const selectedBarber = barbers.find((b) => b.id === barberId);
        setBarber(selectedBarber || null);
      } catch (error) {
        setErrorMessage("Berber bilgileri getirilirken bir hata oluştu.");
      }
    };

    fetchBarberData();
  }, [barberId]);

  return (
    <LoadingBoundary isLoading={!barber}>
      <ErrorBoundary
        resetError={() => setErrorMessage(null)}
        isErrored={!!errorMessage}
        error={errorMessage}
      >
        {barber && (
          <View style={styles.container}>
            <Header barber={barber} />
            <SectionList
              contentContainerStyle={styles.section}
              ListHeaderComponent={<Location barber={barber} />}
              sections={[
                {
                  title: "Hizmetler",
                  type: "services",
                  data: barber.services as any,
                },
                {
                  title: "Müşteri Yorumları",
                  type: "reviews",
                  data: barber.ratings,
                },
              ]}
              keyExtractor={(item, index) => item + index}
              renderItem={(data) => {
                const { type } = data.section;
                const { item } = data;
                return type === "services" ? (
                  <Service item={item} />
                ) : (
                  <Review item={item} />
                );
              }}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.sectionTitle}>{title}</Text>
              )}
            />
          </View>
        )}
      </ErrorBoundary>
    </LoadingBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 10,
    marginTop: 20,
  },
});

export default BarberProfileContainer;
