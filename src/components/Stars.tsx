import { Icon } from "@rneui/themed";
import { View } from "react-native";

const Stars = ({ numStars }: { numStars: number }) => {
  const yellowStars = Array.from({ length: numStars }).map((_, index) => (
    <Icon
      key={index}
      name="star"
      type="material-community"
      size={16}
      color="#FFD700"
      style={{ marginRight: 5 }}
    />
  ));

  const whiteStars = Array.from({ length: 5 - numStars }).map((_, index) => (
    <Icon
      key={index + numStars}
      name="star"
      type="material-community"
      size={16}
      color="white"
      style={{ marginRight: 5 }}
    />
  ));

  return (
    <View style={{ flexDirection: "row" }}>
      {[...yellowStars, ...whiteStars]}
    </View>
  );
};

export default Stars;
