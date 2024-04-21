import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { ListItem, Avatar, Icon, Button } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import Stars from "../../../components/Stars";
import { Barber } from "../../../types";
import { colors } from "../../../utils";

function BarberListItem({
  item,
  animatedValue,
  isLoading,
}: {
  item: any;
  animatedValue: Animated.Value;
  isLoading: boolean;
}) {
  if (isLoading) {
    return <BarberListItemPlaceholder />;
  }
  const handleTakeAppointment = (barberId: number) => {
    console.log("Sıra alma ekranına gidiliyor, berber ID:", barberId);
    // Sıra alma ekranına navigasyon
    // navigation.navigate('Appointment', { barberId });
  };

  const handleViewProfile = (barberId: number) => {
    console.log("Profil görüntüleniyor, berber ID:", barberId);
    // Profil görüntüleme navigasyonu
    // navigation.navigate('Profile', { barberId });
  };

  return (
    <ListItem
      linearGradientProps={{
        colors: [colors.secondary, colors.primary],
        start: { x: 1, y: 0 },
        end: { x: 0.2, y: 0 },
      }}
      ViewComponent={LinearGradient}
      containerStyle={{
        borderRadius: 10,
        marginVertical: 5,
        padding: 10,
        marginHorizontal: 10,
      }}
    >
      <ListItem.Content
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.leftContainer}>
          <Avatar
            rounded
            size="large" // Make the profile picture larger
            source={{ uri: "https://randomuser.me/api/portraits/men/33.jpg" }}
          />
          <Button
            onPress={() => handleViewProfile(item.id)}
            color={colors.secondary}
            buttonStyle={{
              borderRadius: 3,
              marginVertical: 5,
            }}
            titleStyle={{
              color: colors.primary,
            }}
          >
            Profil
          </Button>
        </View>

        <View style={styles.centerContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <ListItem.Title
                style={{
                  color: colors.grey1,
                  fontWeight: "bold",
                  marginBottom: 5,
                  fontSize: 18,
                }}
              >
                {item.name}
              </ListItem.Title>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon
                  name="map-marker"
                  type="material-community"
                  size={16}
                  color={colors.white}
                />
                <Text style={{ color: colors.white, marginLeft: 5 }}>
                  {item.location}
                </Text>
              </View>
              <Stars numStars={item.stars} />
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Icon
              name="comment"
              type="material-community"
              size={16}
              color={colors.white}
            />
            <Text style={{ color: colors.white, marginLeft: 2 }}>
              {item.reviews}
            </Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Animated.View
            style={{
              transform: [
                {
                  translateX: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 5],
                  }),
                },
              ],
            }}
          >
            <TouchableOpacity onPress={() => handleTakeAppointment(item.id)}>
              <Icon
                name="chevron-right"
                type="material-community"
                size={24}
                color={colors.divider} // Use primary color for appointment icon
              />
            </TouchableOpacity>
          </Animated.View>

          <Text style={styles.appointmentText}>Randevu Al</Text>
        </View>
      </ListItem.Content>
    </ListItem>
  );
}

const BarberListItemPlaceholder = () => {
  return (
    <View style={placeHolderstyles.container}>
      <View style={placeHolderstyles.leftContainer}>
        <View style={placeHolderstyles.avatarPlaceholder} />
        <View style={placeHolderstyles.buttonPlaceholder} />
      </View>
      <View style={placeHolderstyles.centerContainer}>
        <View style={placeHolderstyles.titlePlaceholder} />
        <View style={placeHolderstyles.locationPlaceholder} />
        <View style={placeHolderstyles.starsPlaceholder} />
      </View>
      <View style={placeHolderstyles.rightContainer}>
        <View style={placeHolderstyles.iconPlaceholder} />
        <View style={placeHolderstyles.appointmentTextPlaceholder} />
      </View>
    </View>
  );
};

const placeHolderstyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: colors.white,
  },
  leftContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.grey2,
    marginBottom: 5,
  },
  buttonPlaceholder: {
    width: 60,
    height: 20,
    backgroundColor: colors.grey2,
  },
  centerContainer: {
    flex: 1,
    marginLeft: 10,
  },
  titlePlaceholder: {
    width: "70%",
    height: 20,
    backgroundColor: colors.grey2,
    marginBottom: 5,
  },
  locationPlaceholder: {
    width: "50%",
    height: 15,
    backgroundColor: colors.grey2,
    marginBottom: 5,
  },
  starsPlaceholder: {
    width: "50%",
    height: 15,
    backgroundColor: colors.grey2,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconPlaceholder: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.grey2,
    marginRight: 5,
  },
  appointmentTextPlaceholder: {
    width: 60,
    height: 20,
    backgroundColor: colors.grey2,
  },
});
const styles = StyleSheet.create({
  leftContainer: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  centerContainer: {
    flex: 2,
    alignSelf: "center",
    marginLeft: 10,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    marginRight: 10,
  },
  appointmentText: {
    color: colors.primary,
    backgroundColor: colors.grey2,
    padding: 5,
    borderRadius: 5,
    fontWeight: "bold",
  },
});

export default BarberListItem;
