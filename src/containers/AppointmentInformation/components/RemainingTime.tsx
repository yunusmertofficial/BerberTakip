import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";
import { colors } from "../../../utils";

const RemainingTime: React.FC<{
  endTime: Date;
  formatTime: (time: number) => {
    days?: string;
    hours: string;
    minutes: string;
  };
}> = ({ endTime, formatTime }) => {
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    const updateRemainingTime = () => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const remaining = Math.max(0, end - now);
      setRemainingTime(remaining);
    };

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  const time = formatTime(remainingTime);

  return (
    <View style={styles.remainingTimeContainer}>
      {time.days && (
        <View style={styles.timeBox}>
          <Text style={styles.timeLabel}>Gün</Text>
          <Text style={styles.timeDigit}>{time.days}</Text>
        </View>
      )}
      {time.hours && (
        <View style={styles.timeBox}>
          <Text style={styles.timeLabel}>Saat</Text>
          <Text style={styles.timeDigit}>{time.hours}</Text>
        </View>
      )}
      <View style={styles.timeBox}>
        <Text style={styles.timeLabel}>Dakika</Text>
        <Text style={styles.timeDigit}>{time.minutes}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  remainingTimeContainer: {
    flexDirection: "row",
    backgroundColor: colors.searchBg,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  timeBox: {
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  timeLabel: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  timeDigit: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: "bold",
  },
});

export default RemainingTime;
