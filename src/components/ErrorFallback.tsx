import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { colors } from "../utils";

export interface ErrorFallbackProps {
  resetError: () => void;
  title?: string;
  error?: string | null;
}

const ErrorFallbackComponent: React.FC<ErrorFallbackProps> = ({
  resetError,
  title,
  error,
}) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>{title || "Bir şeyler ters gitti."}</Text>
      <Text style={styles.error}>
        {error ||
          "Üzgünüz, bir şeyler ters gitti ve işlem tamamlanamadı. Lütfen tekrar deneyin."}
      </Text>
      <TouchableOpacity style={styles.button} onPress={resetError}>
        <Text style={styles.buttonText}>Tekrar Dene</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.black,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: colors.grey5,
  },
  error: {
    fontSize: 16,
    marginBottom: 30,
    color: colors.grey4,
    textAlign: "center",
    lineHeight: 22,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default ErrorFallbackComponent;
