import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import Stars from "../../../components/Stars";
import { Avatar, Icon } from "@rneui/themed";
import { colors } from "../../../utils";
import Barber from "../../../types/Barber";
import { ImagesAssets } from "../../../../assets/ImageAssets";

const Header = ({ barber }: { barber: Barber }) => {
  const [rating, setRating] = React.useState<number>(0);
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
            <Text style={{ color: colors.white, marginLeft: 10 }}>
              {rating ? "Puanlamanız:" : "Puan Ver:"}
            </Text>
          </View>
        </View>
        <Stars
          style={{ position: "relative", top: 10 }}
          numStars={rating}
          size={30}
          isEditable={rating == 0}
          onStarClick={(rating) => {
            setRating(rating);
          }}
        />
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
