import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Animated, View } from "react-native";
import { Text } from "@rneui/themed";
import { ImagesAssets } from "@assets/ImageAssets";
import { colors } from "@utils";
import { SafeAreaView } from "react-native-safe-area-context";
import RemainingTime from "./RemainingTime";

const InProgressAppointmentInformation: React.FC<{
  barberName: string;
  personnelName: string;
  startedAt: Date;
  estimatedEndTime: Date;
}> = ({ barberName, personnelName, startedAt, estimatedEndTime }) => {
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    const animateShaver = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animateShaver.start();

    return () => animateShaver.stop();
  }, []);

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Text style={styles.title}>Şuan Randevunuz Devam Ediyor</Text>
      <View style={styles.infoContainer}>
        <Animated.Image
          source={ImagesAssets.shaver_machine_icon}
          style={[
            styles.shaverIcon,
            {
              transform: [
                {
                  translateX: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 20],
                  }),
                },
              ],
            },
          ]}
          resizeMode="contain"
        />

        <Image
          source={ImagesAssets.customer_in_progress}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Kuaför: {barberName}</Text>
          <Text style={styles.infoText}>Çalışan: {personnelName}</Text>
          <Text style={styles.infoText}>
            Randevu Başlama Saati: {startedAt.toLocaleTimeString()}
          </Text>
          <Text style={styles.estimatedTimeText}>Tahmini Bitiş Süresi</Text>
          <RemainingTime endTime={estimatedEndTime} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: colors.primary,
    textAlign: "center",
  },
  infoContainer: {
    alignItems: "center",
    padding: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  estimatedTimeText: {
    fontSize: 18,
    color: colors.secondary,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 10,
  },
  shaverIcon: {
    width: 50,
    height: 50,
  },
  image: {
    width: 300,
    height: 150,
    marginBottom: 10,
  },
});
export default InProgressAppointmentInformation;
