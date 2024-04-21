import React from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { Button, Text } from "@rneui/themed";
import { useFormik } from "formik";
import { Card as CardComponent, CardHeader } from "../../components/Card";
import PhoneNumberInput from "./components/FormikFields/PhoneNumberInput";
import PasswordInput from "./components/FormikFields/PasswordInput";
import VerificationCodeInputs from "./components/FormikFields/VerificationCodeInputs";
import { useSignIn } from "../../hooks/apiServices/auth/useSignin";
import LoginOptionField from "./components/FormikFields/LoginOptionField";
import RoutingSignup from "./components/RoutingSignup";
import BackgroundHeader from "./components/BackgroundHeader";
import SignInFormValues from "../../types/FormValues/Auth/SignIn";
import SigninSchema from "../../formikSchemas/Auth/SigninSchema";

const SigninContainer = () => {
  const { signIn, loading, error } = useSignIn();
  const formik = useFormik<SignInFormValues>({
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
        <PhoneNumberInput formik={formik} />
        {formik.values.loginOption === "password" ? (
          <PasswordInput formik={formik} />
        ) : null}
        {formik.values.loginOption === "verificationCode" ? (
          <VerificationCodeInputs formik={formik} />
        ) : null}
        <LoginOptionField formik={formik} />
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
