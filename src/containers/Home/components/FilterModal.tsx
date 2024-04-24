import { Icon } from "@rneui/themed";
import React, { useReducer } from "react";
import { View, Text, StyleSheet, Button, Modal, Pressable } from "react-native";
import Stars from "../../../components/Stars";

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
    setModalVisible(false);
    applyFilters(state);
  };

  // Yıldız sayısı seçenekleri
  const starOptions = ["2", "3", "4"];

  // Mesafe seçenekleri
  const distanceOptions = ["1", "2", "3", "4", "5"];

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <Pressable
        style={styles.modalContainer}
        onPress={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.innerContainer}>
          <View style={styles.filterGroup}>
            <Text style={styles.filterTitle}>Yıldıza Göre Filtreleme:</Text>
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
          <View style={styles.filterGroup}>
            <Text style={styles.filterTitle}>Konuma Göre Filtreleme:</Text>
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
          <Button title="Uygula" onPress={handleApplyFilters} />
          <Pressable
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Icon
              name="close"
              type="material-community"
              size={24}
              color="#333"
            />
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  innerContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    zIndex: 2,
  },
  filterGroup: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
});

export default FilterModal;
