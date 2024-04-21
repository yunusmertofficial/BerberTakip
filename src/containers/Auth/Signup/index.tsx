import React from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Button, Text } from "@rneui/themed";
import { useFormik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import SignupSchema from "../../../formikSchemas/Auth/SignupSchema";
import SignUpFormValues from "../../../types/FormValues/Auth/SignUp";
import { useSignUp } from "../../../hooks/apiServices/auth/useSignup";
import { Card as CardComponent, CardHeader } from "../../../components/Card";
import PasswordInput from "../components/FormikFields/PasswordInput";
import PhoneNumberInput from "../components/FormikFields/PhoneNumberInput";
import NameInput from "./components/FormikFields/NameInput";
import AgreementCheckbox from "./components/FormikFields/AgreementCheckbox";
import RoutingSignin from "./components/RoutingSignin";

const SignupContainer = () => {
  const { signUp, loading, error } = useSignUp();

  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      name: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      agreement: false,
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      signUp(values);
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
      <LinearGradient
        colors={["#ff0080", "#ff7f00"]}
        style={styles.background}
      />
      <CardComponent>
        <CardHeader>Kayıt Ol</CardHeader>
        <NameInput formik={formik} />
        <PhoneNumberInput formik={formik} />
        <PasswordInput formik={formik} />
        <PasswordInput formik={formik} type="confirmPassword" />
        <AgreementCheckbox formik={formik} />
        {formik.errors.agreement && (
          <Text style={styles.error}>{formik.errors.agreement}</Text>
        )}
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.button}>
          <Button
            title="Kayıt Ol"
            onPress={() => formik.handleSubmit()}
            disabled={!formik.isValid}
            loading={loading}
          />
        </View>
        <RoutingSignin />
      </CardComponent>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
  },
});

export default SignupContainer;
