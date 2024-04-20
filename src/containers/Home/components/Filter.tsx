import React from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@rneui/base";
import { Icon } from "@rneui/themed";

export const Filter = ({
  modalVisibile,
  setModalVisibile,
  handleMapNavigation,
}: {
  modalVisibile: boolean;
  setModalVisibile: React.Dispatch<React.SetStateAction<boolean>>;
  handleMapNavigation: () => void;
}) => {
  return (
    <SafeAreaView
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        padding: 20,
        backgroundColor: "white",
      }}
    >
      <Pressable
        onPress={() => setModalVisibile(!modalVisibile)}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Icon name="sort" type="material-community" size={22} color="gray" />

        <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
          Sırala
        </Text>
      </Pressable>

      <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon name="filter" type="material-community" size={22} color="gray" />
        <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
          Filtrele
        </Text>
      </Pressable>

      <Pressable
        onPress={handleMapNavigation}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Icon
          name="map-marker-alt"
          type="font-awesome-5"
          size={22}
          color="gray"
        />
        <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
          Harita
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};