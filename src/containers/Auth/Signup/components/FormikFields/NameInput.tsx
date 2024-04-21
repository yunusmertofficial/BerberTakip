import { Input } from "@rneui/themed";
import React from "react";
import SignUpFormValues from "../../../../../types/FormValues/Auth/SignUp";
import { FormikProps } from "formik";
const NameInput = ({ formik }: { formik: FormikProps<SignUpFormValues> }) => {
  return (
    <Input
      onChangeText={formik.handleChange("name")}
      onBlur={formik.handleBlur("name")}
      value={formik.values.name}
      errorMessage={
        formik.touched.name && formik.errors.name ? formik.errors.name : ""
      }
      placeholder="İsim"
      style={{
        margin: 0,
        padding: 0,
      }}
    />
  );
};

export default NameInput;
