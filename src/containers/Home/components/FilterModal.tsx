import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import Stars from "@components/Stars"; // Doğru yolda olduğunu varsayıyorum.
import { FilterState } from "src/types/FormValues/Home/Filter";

interface FilterModalProps {
  modalVisible: boolean;
  handleCloseFilterModal: () => void;
  applyFilters: (filters: FilterState) => void;
  initialValues: FilterState;
}

const FilterModal: React.FC<FilterModalProps> = React.memo(
  ({ modalVisible, handleCloseFilterModal, applyFilters, initialValues }) => {
    console.log("FilterModal rendered");
    const formik = useFormik<FilterState>({
      initialValues,
      validationSchema: Yup.object({
        minStars: Yup.string().required("Yıldız sayısı seçimi zorunludur."),
        maxDistance: Yup.number()
          .min(1, "En az 1 km olmalıdır")
          .required("Bu alan zorunludur."),
      }),
      onSubmit: (values) => {
        applyFilters(values);
        handleCloseFilterModal();
      },
    });

    const setFormValues = useCallback(() => {
      if (modalVisible) {
        formik.setValues(initialValues);
      } else {
        formik.resetForm();
      }
    }, [modalVisible, initialValues]);

    useEffect(() => {
      setFormValues();
    }, [setFormValues]);

    // Yıldız sayısı seçenekleri
    const starOptions = ["2", "3", "4"];

    return (
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          formik.resetForm(); // Modal kapanırken formu resetle
          handleCloseFilterModal();
        }}
      >
        <Pressable
          style={styles.modalContainer}
          onPress={() => {
            formik.resetForm(); // Dışarı tıklanınca formu resetle
            handleCloseFilterModal();
          }}
        >
          <View
            style={styles.innerContainer}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.filterGroup}>
              <Text style={styles.filterTitle}>Yıldıza Göre Filtreleme:</Text>
              {starOptions.map((option) => (
                <Pressable
                  key={option}
                  onPress={() => formik.setFieldValue("minStars", option)}
                  style={styles.starOption}
                >
                  <View
                    style={
                      formik.values.minStars === option
                        ? styles.radioSelected
                        : styles.radioUnselected
                    }
                  />
                  <Stars numStars={parseInt(option)} />
                  <Text
                    style={[
                      styles.starText,
                      formik.values.minStars === option && styles.boldText,
                    ]}
                  >
                    {option} ve üzeri
                  </Text>
                </Pressable>
              ))}
              {formik.touched.minStars && formik.errors.minStars ? (
                <Text style={styles.errorText}>{formik.errors.minStars}</Text>
              ) : null}
            </View>
            <View style={styles.filterGroup}>
              <Text style={styles.filterTitle}>Maksimum Mesafe (km):</Text>
              <TextInput
                style={styles.input}
                onChangeText={formik.handleChange("maxDistance")}
                onBlur={formik.handleBlur("maxDistance")}
                value={formik.values.maxDistance.toString()}
                keyboardType="number-pad"
              />
              {formik.touched.maxDistance && formik.errors.maxDistance ? (
                <Text style={styles.errorText}>
                  {formik.errors.maxDistance}
                </Text>
              ) : null}
            </View>
            <Button title="Uygula" onPress={() => formik.handleSubmit()} />
          </View>
        </Pressable>
      </Modal>
    );
  }
);
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
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  starOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  radioSelected: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
    backgroundColor: "#007AFF",
    marginRight: 10,
  },
  radioUnselected: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: "transparent",
    marginRight: 10,
  },
  starText: {
    marginLeft: 10,
  },
  boldText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FilterModal;
