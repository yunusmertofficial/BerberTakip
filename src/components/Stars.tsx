import { Icon } from "@rneui/themed";
import { View } from "react-native";

const Stars = ({
  numStars,
  size = 20,
}: {
  numStars: number;
  size?: number;
}) => {
  const yellowStars = Array.from({ length: numStars }).map((_, index) => (
    <Icon
      key={index}
      name="star"
      type="material-community"
      size={size}
      color="#FFD700"
      style={{ marginRight: 5 }}
    />
  ));

  const whiteStars = Array.from({ length: 5 - numStars }).map((_, index) => (
    <Icon
      key={index + numStars}
      name="star"
      type="material-community"
      size={size}
      color="white"
      style={{ marginRight: 5 }}
    />
  ));

  return (
    <View style={[{ flexDirection: "row" }]}>
      {[...yellowStars, ...whiteStars]}
    </View>
  );
};

export default Stars;
