import { Input } from "@rneui/themed";
import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const PasswordInput = ({
  formik,
  type = "password",
}: {
  formik: any;
  type?: "password" | "confirmPassword";
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <Input
      onChangeText={formik.handleChange(type)}
      onBlur={formik.handleBlur(type)}
      value={formik.values[type]}
      secureTextEntry={!showPassword}
      errorMessage={
        formik.touched[type] && formik.errors[type] ? formik.errors[type] : ""
      }
      placeholder={type === "password" ? "Şifre" : "Şifreyi Onayla"}
      style={{
        margin: 0,
        padding: 0,
      }}
      rightIcon={
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      }
    />
  );
};

export default PasswordInput;
