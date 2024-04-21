import React, { useReducer } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { BottomModal, SlideAnimation, ModalTitle } from "react-native-modals";
import { Button, Icon } from "@rneui/themed";
import Stars from "../../../components/Stars";
import calculateDelta from "../../../utils/regionUtil";

// State tipi
interface FilterState {
  minStars: string;
  locationFilter: string;
}

// Action tipi
type FilterAction =
  | { type: "SET_MIN_STARS"; payload: string }
  | { type: "SET_LOCATION_FILTER"; payload: string };

// Reducer
const filterReducer = (
  state: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case "SET_MIN_STARS":
      return { ...state, minStars: action.payload };
    case "SET_LOCATION_FILTER":
      return { ...state, locationFilter: action.payload };
    default:
      return state;
  }
};

const FilterModal: React.FC<{
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  applyFilters: (filters: FilterState) => void;
}> = ({ modalVisible, setModalVisible, applyFilters }) => {
  const initialState: FilterState = {
    minStars: "",
    locationFilter: "",
  };

  const [state, dispatch] = useReducer(filterReducer, initialState);

  const handleApplyFilters = () => {
    const delta = calculateDelta(parseInt(state.locationFilter));
    setModalVisible(false);
    // applyFilters({ minStars: state.minStars, locationFilter: delta });
  };

  // Yıldız sayısı seçenekleri
  const starOptions = ["2", "3", "4"];

  // Mesafe seçenekleri
  const distanceOptions = ["1", "2", "3", "4", "5"];

  return (
    <BottomModal
      visible={modalVisible}
      onTouchOutside={() => setModalVisible(false)}
      swipeDirection={["up", "down"]}
      swipeThreshold={200}
      modalTitle={<ModalTitle title="Filtrele" />}
      modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
    >
      <View style={styles.container}>
        <View style={styles.filterGroup}>
          <Text style={styles.filterTitle}>Yıldıza Göre Filtreleme:</Text>
          <View style={styles.optionsContainer}>
            {starOptions.map((option) => (
              <Pressable
                key={option}
                onPress={() =>
                  dispatch({ type: "SET_MIN_STARS", payload: option })
                }
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Icon
                  name={
                    state.minStars === option
                      ? "radiobox-marked"
                      : "radiobox-blank"
                  }
                  type="material-community"
                  size={state.minStars === option ? 28 : 24} // Increase size if selected
                  color="#007AFF"
                  style={{ marginRight: 10 }}
                />
                <View style={{ flexDirection: "row" }}>
                  <Stars numStars={parseInt(option)} />
                  <Text
                    style={{
                      fontWeight: state.minStars === option ? "bold" : "normal",
                    }}
                  >
                    {option} ve üzeri
                  </Text>
                  {/* Bold text if selected */}
                </View>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.filterGroup}>
          <Text style={styles.filterTitle}>Konuma Göre Filtreleme:</Text>
          <View style={styles.optionsContainer}>
            {distanceOptions.map((option) => (
              <Pressable
                key={option}
                onPress={() =>
                  dispatch({ type: "SET_LOCATION_FILTER", payload: option })
                }
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Icon
                  name={
                    state.locationFilter === option
                      ? "radiobox-marked"
                      : "radiobox-blank"
                  }
                  type="material-community"
                  size={state.locationFilter === option ? 28 : 24} // Increase size if selected
                  color="#007AFF"
                  style={{ marginRight: 10 }}
                />
                <Text
                  style={{
                    fontWeight:
                      state.locationFilter === option ? "bold" : "normal",
                  }}
                >
                  {option} en fazla km uzaklıkta
                </Text>
                {/* Bold text if selected */}
              </Pressable>
            ))}
          </View>
        </View>
        <Button title="Uygula" onPress={handleApplyFilters} />
      </View>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  filterGroup: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "column",
  },
});

export default FilterModal;
