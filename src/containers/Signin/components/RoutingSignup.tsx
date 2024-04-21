import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@rneui/themed";
import { Link } from "@react-navigation/native";

const RoutingSignup = () => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text>Hesabınız yok mu? </Text>
        <Link screen="Signup"> Kayıt Ol</Link>
      </View>
    </TouchableOpacity>
  );
};

export default RoutingSignup;
