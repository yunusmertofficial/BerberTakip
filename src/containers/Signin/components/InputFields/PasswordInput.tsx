import { Input } from "@rneui/themed";
import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const PasswordInput = ({ formik }: { formik: any }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <Input
      onChangeText={formik.handleChange("password")}
      onBlur={formik.handleBlur("password")}
      value={formik.values.password}
      secureTextEntry={!showPassword}
      errorMessage={
        formik.touched.password && formik.errors.password
          ? formik.errors.password
          : ""
      }
      placeholder="Şifre"
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
