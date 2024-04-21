import React from "react";
import { Icon } from "@rneui/themed";
import { View } from "react-native";

const DistanceIcons = ({ selectedDistance }: { selectedDistance: number }) => {
  const icons = Array.from({ length: 5 }).map((_, index) => (
    <Icon
      key={index}
      name={index + 1 <= selectedDistance ? "map-marker" : "map-marker-outline"}
      type="material-community"
      size={24}
      color={index + 1 <= selectedDistance ? "#FFD700" : "white"}
      style={{ marginRight: 5 }}
    />
  ));

  return <View style={{ flexDirection: "row" }}>{icons}</View>;
};

export default DistanceIcons;
