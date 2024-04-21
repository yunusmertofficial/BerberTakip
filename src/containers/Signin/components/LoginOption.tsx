import React from "react";
import { View } from "react-native";
import { Button } from "@rneui/themed";

const LoginOption = ({ formik }: { formik: any }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
      }}
    >
      <Button
        title="Şifreyle Giriş"
        onPress={() => formik.setFieldValue("loginOption", "password")}
        color={formik.values.loginOption === "password" ? "primary" : "gray"}
      />
      <Button
        title="Doğrulama Koduyla Giriş"
        onPress={() => formik.setFieldValue("loginOption", "verificationCode")}
        color={
          formik.values.loginOption === "verificationCode" ? "primary" : "gray"
        }
      />
    </View>
  );
};

export default LoginOption;
