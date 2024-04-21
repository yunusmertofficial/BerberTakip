import React from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { Button, Text } from "@rneui/themed";
import { useFormik } from "formik";
import { Card as CardComponent, CardHeader } from "../../components/Card";
import PhoneNumber from "./components/InputFields/PhoneNumber";
import PasswordInput from "./components/InputFields/PasswordInput";
import VerificationCode from "./components/InputFields/VerificationCode";
import { useSignIn } from "../../hooks/apiServices/auth/useSignin";
import LoginOption from "./components/LoginOption";
import RoutingSignup from "./components/RoutingSignup";
import SigninSchema from "../../formikSchemas/signin";
import BackgroundHeader from "./components/BackgroundHeader";

interface FormValues {
  phoneNumber: string;
  password: string;
  loginOption: "password" | "verificationCode" | "";
  verificationCode: [string, string, string, string];
}

const SigninContainer = () => {
  const { signIn, loading, error } = useSignIn();
  const formik = useFormik<FormValues>({
    initialValues: {
      phoneNumber: "",
      loginOption: "password",
      password: "",
      verificationCode: ["", "", "", ""],
    },
    validationSchema: SigninSchema,
    onSubmit: (values) => {
      signIn(values);
    },
  });

  const windowHeight = Dimensions.get("window").height;

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        height: windowHeight,
      }}
    >
      <BackgroundHeader />
      <CardComponent>
        <CardHeader> Giriş Yap</CardHeader>
        <PhoneNumber formik={formik} />
        {formik.values.loginOption === "password" ? (
          <PasswordInput formik={formik} />
        ) : null}
        {formik.values.loginOption === "verificationCode" ? (
          <VerificationCode formik={formik} />
        ) : null}
        <LoginOption formik={formik} />
        {error && <Text style={styles.error}>{error}</Text>}
        <Button
          title="Giriş Yap"
          onPress={() => {
            if (formik.values.loginOption === "") {
              alert("Lütfen giriş yöntemi seçin");
            } else {
              formik.handleSubmit();
            }
          }}
          style={styles.button}
          disabled={!formik.isValid}
          loading={loading}
        />
        <RoutingSignup />
      </CardComponent>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "48%",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default SigninContainer;
