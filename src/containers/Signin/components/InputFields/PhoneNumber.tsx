import { Input } from "@rneui/base";
import React from "react";

const PhoneNumber = ({ formik }: { formik: any }) => {
  return (
    <Input
      label="Telefon Numarası"
      onChangeText={formik.handleChange("phoneNumber")}
      onBlur={formik.handleBlur("phoneNumber")}
      value={formik.values.phoneNumber}
      keyboardType="phone-pad"
      errorMessage={
        formik.touched.phoneNumber && formik.errors.phoneNumber
          ? formik.errors.phoneNumber
          : ""
      }
      placeholder="530 880 8637"
      maxLength={10}
      style={{
        margin: 0,
        padding: 0,
      }}
    />
  );
};

export default PhoneNumber;
