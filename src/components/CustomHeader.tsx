import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import { colors } from "@utils";
import { SearchBar } from "./SearchBar";
import { useSelector } from "react-redux";
import { RootState } from "@store";
import FilterModal from "src/containers/Home/components/FilterModal";
import { useBarbers } from "@context/BarbersContext";
import { useNavigation } from "@react-navigation/native";
import HomeScreenProps from "src/types/navigation/screens/Home";
import { FilterState } from "src/types/FormValues/Home/Filter";

const CustomHeader = React.memo(
  ({
    setSearchQuery,
    filters,
    setFilters,
    searchQuery,
  }: {
    setSearchQuery: (searchQuery: string) => void;
    filters?: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    searchQuery: string;
  }) => {
    const navigation = useNavigation<HomeScreenProps["navigation"]>();

    const [modalVisibile, setModalVisibile] = useState(false);

    const handleOpenFilterModal = () => {
      setModalVisibile(true);
    };

    const handleCloseFilterModal = () => {
      setModalVisibile(false);
    };

    const address = useSelector(
      (state: RootState) => state.user?.location?.address
    );

    const regionalSummary = address
      ? `${address?.subregion}, ${address?.region}, ${address?.postalCode}`
      : "";
    const fullAddress = address ? address?.formattedAddress : "";

    return (
      <>
        <FilterModal
          modalVisible={modalVisibile}
          handleCloseFilterModal={handleCloseFilterModal}
          applyFilters={(filters) => setFilters(filters)}
          initialValues={{
            minStars: filters?.minStars || "",
            maxDistance: filters?.maxDistance || 5,
          }}
        />
        <View style={styles.headerContainer}>
          <View style={styles.topRow}>
            <Icon
              name="account-circle"
              type="material"
              color={colors.white}
              size={40} // Boyutu 28'e yükseltildi
              onPress={() => {
                console.log("Profil açıldı");
              }}
              style={{ paddingHorizontal: 0 }}
            />
            <View style={styles.addressContainer}>
              <Text numberOfLines={1} style={styles.regionalSummary}>
                {fullAddress}
              </Text>
              <Text numberOfLines={1} style={styles.fullAddress}>
                {regionalSummary}
              </Text>
            </View>
            <View style={styles.iconsRight}>
              <Icon
                name="heart-outline"
                type="material-community"
                color={colors.white}
                size={28}
                style={styles.heartIcon}
                onPress={() => {
                  console.log("Favorilere eklendi");
                }}
              />
              <Icon
                name="notifications"
                type="material"
                color={colors.white}
                size={28} // Boyutu eşitlendi
                style={styles.notificationIcon}
                onPress={() => {
                  console.log("Bildirimler açıldı");
                }}
              />
            </View>
          </View>
          <View style={styles.searchRow}>
            <Icon
              name="filter-list"
              type="material"
              color={colors.black}
              size={28}
              style={styles.filterIcon}
              onPress={handleOpenFilterModal}
            />
            <SearchBar
              placeholder="Berber arayın"
              searchData={async (searchQuery) =>
                setSearchQuery(searchQuery.toLowerCase())
              }
            />
            <Icon
              name="map-marker-alt"
              type="font-awesome-5"
              color={colors.secondary}
              size={28}
              onPress={() => {
                navigation.navigate("Map", {
                  filters,
                  searchQuery: searchQuery || "",
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                });
              }}
            />
          </View>
        </View>
      </>
    );
  }
);

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.primary,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addressContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  regionalSummary: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  fullAddress: {
    color: "white",
    fontSize: 12,
  },
  iconWrapper: {
    alignItems: "center",
  },
  iconsRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  heartIcon: {
    marginLeft: 20, // Aralık genişletildi
  },
  notificationIcon: {
    marginLeft: 20, // Aralık genişletildi
  },
  searchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterIcon: {
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 5,
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default CustomHeader;
