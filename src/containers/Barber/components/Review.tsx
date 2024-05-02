import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Stars from "../../../components/Stars";
import { colors, formatTimeAgo } from "../../../utils";
import Rating from "../../../types/Rating";

export const Review = ({ item }: { item: Rating }) => {
  return (
    <View style={styles.reviewItem}>
      <Stars numStars={item.ratingValue} />
      <Text style={styles.review}>{item.comment}</Text>
      <Text style={{ color: colors.grey4 }}>{formatTimeAgo(item.date)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewItem: {
    backgroundColor: colors.grey1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  review: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 5,
  },
});

export default Review;
