import { Icon } from "@rneui/themed";
import { useState } from "react";
import { View, StyleSheet, ViewStyle, TouchableOpacity } from "react-native";

const Stars = ({
  numStars,
  style,
  isEditable = false,
  onStarClick = () => {},
  size = 16,
}: {
  numStars: number;
  style?: ViewStyle;
  size?: number;
  isEditable?: boolean;
  onStarClick?: (index: number) => void;
}) => {
  const stars = Array.from({ length: 5 }).map((_, index) => {
    const color = index < Math.floor(numStars) ? "#FFD700" : "white";
    return (
      <TouchableOpacity
        key={index}
        disabled={!isEditable}
        onPress={() => {
          onStarClick(index + 1);
        }}
      >
        <Icon
          name="star"
          type="material-community"
          size={size}
          color={color}
          style={{ marginRight: 5 }}
        />
      </TouchableOpacity>
    );
  });

  return <View style={[styles.container, style]}>{stars}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default Stars;
