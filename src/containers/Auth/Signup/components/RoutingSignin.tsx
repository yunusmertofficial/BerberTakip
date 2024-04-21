import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Link } from "@react-navigation/native";

const RoutingSignin = () => {
  return (
    <TouchableOpacity
      style={{
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
      }}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Link screen="Signin"> Giriş Yap</Link>
      </View>
    </TouchableOpacity>
  );
};

export default RoutingSignin;
