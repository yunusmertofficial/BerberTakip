import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Icon, Text, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "../../../components/SearchBar";

const colors = {
  primary: "#38B2AC", // Turquoise
  secondary: "#FFD700", // Golden Yellow
  background: "#F5F5F5", // Light Gray
  white: "#FFFFFF", // Pure White
  black: "#000000", // Pure Black
  grey0: "#FFFFFF", // Pure White
  grey1: "#F2F2F2", // Very Light Gray
  grey2: "#E0E0E0", // Light Gray
  grey3: "#CCCCCC", // Medium Gray
  grey4: "#999999", // Dark Gray
  grey5: "#333333", // Dark Gray
  greyOutline: "#CCCCCC", // Medium Gray
  searchBg: "#E0E0E0", // Light Gray
  success: "#4CAF50", // Green
  error: "#F44336", // Red
  warning: "#FFEB3B", // Yellow
  divider: "#E0E0E0", // Light Gray
};

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
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.primary }]}
    >
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
            color={colors.secondary}
          />
        </Pressable>
      </View>
      <View style={[styles.divider, { backgroundColor: colors.divider }]} />
      <View style={styles.bottomRow}>
        <Button
          onPress={() => setModalVisible(!modalVisible)}
          buttonStyle={[
            styles.button,
            styles.filterButton,
            { backgroundColor: colors.primary },
          ]}
          title="Filtrele"
          icon={
            <Icon
              name="filter"
              type="material-community"
              size={22}
              color={colors.white}
            />
          }
          titleStyle={styles.buttonText}
        />
        <Pressable
          onPress={handleMapNavigation}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.grey3,
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 8,
          }}
        >
          <Icon
            name="map-marker-alt"
            type="font-awesome-5"
            size={22}
            color={colors.black}
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              marginLeft: 8,
              color: colors.black,
            }}
          >
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
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",

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
    backgroundColor: colors.grey5,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 8,
    color: colors.white,
    textAlign: "center",
  },

  iconContainer: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

export default Header;
