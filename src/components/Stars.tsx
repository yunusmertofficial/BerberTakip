import { Icon } from "@rneui/themed";
import { View, StyleSheet, ViewStyle } from "react-native";

const Stars = ({
  numStars,
  style,
  size = 16,
}: {
  numStars: number;
  style?: ViewStyle;
  size?: number;
}) => {
  const yellowStars = Array.from({ length: Math.floor(numStars) }).map(
    (_, index) => (
      <Icon
        key={index}
        name="star"
        type="material-community"
        size={size}
        color="#FFD700"
        style={{ marginRight: 5 }}
      />
    )
  );

  const whiteStars = Array.from({ length: 5 - Math.floor(numStars) }).map(
    (_, index) => (
      <Icon
        key={index + Math.floor(numStars)}
        name="star"
        type="material-community"
        size={size}
        color="white"
        style={{ marginRight: 5 }}
      />
    )
  );

  return (
    <View style={[styles.container, style]}>
      {[...yellowStars, ...whiteStars]}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default Stars;
