import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Icon, Text, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "../../../components/SearchBar";

export const Header = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigation = useNavigation();
  const handleMapNavigation = () => {
    //@ts-ignore
    navigation.navigate("Map", {
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topRow}>
        <SearchBar
          searchData={async (searchTerm) => {
            await new Promise((resolve) => setTimeout(resolve, 10000));
            console.log(searchTerm);
          }}
        />
        <Pressable onPress={() => {}} style={styles.iconContainer}>
          <Icon
            name="bell"
            type="material-community"
            size={22}
            color="#FF5733"
          />
        </Pressable>
      </View>
      <View style={styles.divider} />
      <View style={styles.bottomRow}>
        <Button
          onPress={() => setModalVisible(!modalVisible)}
          buttonStyle={[styles.button, styles.filterButton]}
          title="Filtrele"
          icon={
            <Icon
              name="filter"
              type="material-community"
              size={22}
              color="#FFF"
            />
          }
          titleStyle={styles.buttonText}
        />
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: "#87CEEB", // Açık mavimsi renk
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0", // Ayırıcı rengi
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    marginRight: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterButton: {
    backgroundColor: "#4169E1", // Daha koyu mavimsi renk
  },
  mapButton: {
    backgroundColor: "#00BFFF", // Daha açık mavimsi renk
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 8,
    color: "white",
    textAlign: "center",
  },

  iconContainer: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});
