import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "@rneui/themed";
import { useBarbers } from "../../../context/BarbersContext";

const ErrorMessage = () => {
  const { errorMsg, fetchData } = useBarbers();

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{errorMsg}</Text>
      <Button onPress={fetchData} style={styles.button}>
        Tekrar Dene
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default ErrorMessage;
