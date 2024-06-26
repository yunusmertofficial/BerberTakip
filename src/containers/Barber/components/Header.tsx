import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import Stars from "@components/Stars";
import { Avatar, Icon } from "@rneui/themed";
import { colors } from "@utils";
import Barber from "src/types/Barber";
import { ImagesAssets } from "@assets/ImageAssets";

const Header = ({ barber }: { barber: Barber }) => {
  return (
    <View style={styles.header}>
      <Image
        source={ImagesAssets.barberBanner}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <View style={styles.profileInfo}>
          <Avatar
            rounded
            size="large"
            source={{
              uri: "https://randomuser.me/api/portraits/men/33.jpg",
            }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{barber.name}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Stars numStars={barber.stars} />
              <Text style={{ color: colors.white, marginLeft: 10 }}>
                ({barber.rating} Değerlendirme)
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                name="calendar-check"
                type="material-community"
                size={16}
                color={colors.white}
              />
              <Text style={{ color: colors.white, marginLeft: 10 }}>
                {barber.completed_appointments} (Tamamlanan Randevu)
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 140,
    position: "relative",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginTop: 10,
  },
});

export default Header;
