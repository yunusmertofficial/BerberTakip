import React from "react";
import { Text, CheckBox } from "@rneui/themed";
import { FormikProps } from "formik";
import { Linking } from "react-native";
import SignUpFormValues from "../../../../../types/FormValues/Auth/SignUp";

const AgreementCheckbox = ({
  formik,
}: {
  formik: FormikProps<SignUpFormValues>;
}) => {
  return (
    <CheckBox
      title={
        <Text
          style={{
            color: "gray",
            fontSize: 12,
            fontWeight: "100",
          }}
        >
          BerberTakip müşteri hesabı oluşturmak için kaydolarak
          <Text
            style={{ color: "blue" }}
            onPress={() => Linking.openURL("http://google.com")}
          >
            {" BerberTakip ücretsiz Üyelik Anlaşması "}
          </Text>
          anlaşmamızı okuyup kabul ettiğinizi doğruluyorsunuz.
        </Text>
      }
      checked={formik.values.agreement}
      onPress={() =>
        formik.setFieldValue("agreement", !formik.values.agreement)
      }
      style={{
        marginTop: 10,
        marginBottom: 20,
      }}
    />
  );
};

export default AgreementCheckbox;
