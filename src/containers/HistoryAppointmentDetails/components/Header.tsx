import React, { useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import Stars from "../../../components/Stars";
import { Avatar } from "@rneui/themed";
import { colors } from "../../../utils";
import { ImagesAssets } from "../../../../assets/ImageAssets";
import Personnel from "../../../types/Personnel";

const Header = ({
  personnel,
  initialRating = 0,
}: {
  personnel?: Personnel;
  initialRating?: number;
}) => {
  const [rating, setRating] = useState<number>(initialRating);

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
            source={{ uri: "https://randomuser.me/api/portraits/men/33.jpg" }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{personnel?.barber?.name}</Text>
            <Text style={styles.personnelName}>
              {personnel?.firstName} {personnel?.lastName}
            </Text>
            {!rating && <Text style={styles.ratingPrompt}>Puan ver:</Text>}
          </View>
        </View>
        <Stars
          numStars={rating}
          size={30}
          isEditable={rating === 0}
          onStarClick={setRating}
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
    marginBottom: 10, // Added margin for better separation
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
  personnelName: {
    color: colors.white,
    fontWeight: "500",
    fontSize: 16,
  },
  ratingPrompt: {
    position: "relative",
    top: 5,
    color: colors.grey2,
    fontSize: 16,
  },
});

export default Header;
