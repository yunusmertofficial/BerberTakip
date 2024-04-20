import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Dimensions,
} from "react-native";
import { Button, Input, Text, CheckBox } from "@rneui/themed";
import { useFormik } from "formik";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Link } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useSignUp } from "../hooks/apiServices/auth/useSignup";

interface FormValues {
  name: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
}

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "İsim en az 2 karakter olmalıdır")
    .max(50, "İsim en fazla 50 karakter olmalıdır")
    .required("İsim gereklidir"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Geçersiz telefon numarası")
    .min(10, "Telefon numarası en az 10 karakter olmalıdır")
    .max(10, "Telefon numarası en fazla 10 karakter olmalıdır")
    .required("Telefon numarası gereklidir"),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .required("Şifre gereklidir"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Şifreler eşleşmiyor")
    .required("Şifre onayı gereklidir"),
  agreement: Yup.boolean()
    .oneOf([true], "Kullanıcı sözleşmesini onaylamalısınız")
    .required("Kullanıcı sözleşmesini onaylamalısınız"),
});

const SignupScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, loading, error } = useSignUp();

  const formik = useFormik<FormValues>({
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

      <View style={styles.card}>
        <Text h3 style={styles.heading}>
          Kayıt Ol
        </Text>
        <Input
          onChangeText={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          value={formik.values.name}
          errorMessage={
            formik.touched.name && formik.errors.name ? formik.errors.name : ""
          }
          placeholder="İsim"
          style={styles.input}
        />

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
          style={styles.input}
        />
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
          style={styles.input}
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

        <Input
          onChangeText={formik.handleChange("confirmPassword")}
          onBlur={formik.handleBlur("confirmPassword")}
          value={formik.values.confirmPassword}
          secureTextEntry={!showPassword}
          errorMessage={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : ""
          }
          placeholder="Şifreyi Onayla"
          style={styles.input}
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
          style={styles.checkbox}
        />

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

        <TouchableOpacity style={styles.signinLink}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text>Hesabınız var mı?</Text>
            <Link screen="Signin"> Giriş Yap</Link>
          </View>
        </TouchableOpacity>
      </View>
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
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    elevation: 3, // Add elevation for a card-like effect
  },
  heading: {
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    margin: 0,
    padding: 0,
  },
  checkbox: {
    marginTop: 10,
    marginBottom: 20,
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
  signinLink: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
});

export default SignupScreen;
