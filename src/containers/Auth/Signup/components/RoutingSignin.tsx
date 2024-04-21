import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Link } from "@react-navigation/native";
import { Text } from "@rneui/themed";

const RoutingSignin = () => {
  return (
    <TouchableOpacity style={styles.signinLink}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text>Hesabınız var mı?</Text>
        <Link screen="Signin"> Giriş Yap</Link>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  signinLink: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RoutingSignin;
