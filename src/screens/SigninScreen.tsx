import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { Button, Input, Text } from "@rneui/themed";
import { useFormik } from "formik";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Link } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useSignIn } from "../../hooks/apiServices/auth/useSignin";

interface FormValues {
  phoneNumber: string;
  password: string;
  loginOption: "password" | "verificationCode" | "";
  verificationCode: [string, string, string, string];
}

const SigninSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Geçersiz telefon numarası")
    .min(10, "Telefon numarası en az 10 karakter olmalıdır")
    .max(10, "Telefon numarası en fazla 10 karakter olmalıdır")
    .required("Telefon numarası gereklidir"),
  password: Yup.string().test(
    "conditional-password",
    "Şifre gereklidir",
    function (value) {
      const loginOption = this.parent.loginOption;
      console.log(loginOption);
      if (loginOption === "password") {
        return Yup.string().min(6).isValidSync(value);
      }
      return true;
    }
  ),
  verificationCode: Yup.array().test(
    "conditional-verificationCode",
    "Doğrulama kodu gereklidir",
    function (value) {
      const loginOption = this.parent.loginOption;
      if (loginOption === "verificationCode") {
        if (!Array.isArray(value)) {
          return false;
        }
        if (value.length !== 4) {
          return false;
        }
        for (let i = 0; i < value.length; i++) {
          const code = value[i];
          if (
            typeof code !== "string" ||
            code.length !== 1 ||
            isNaN(parseInt(code)) ||
            parseInt(code) < 0 ||
            parseInt(code) > 9
          ) {
            return false;
          }
        }
        return true;
      }
      return true;
    }
  ),
});

const SigninScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, loading, error } = useSignIn();
  const verificationCodeInputsRef = useRef<Array<any | null>>([]);

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

  const handleChangeVerificationCode = (index: number, text: string) => {
    const verificationCodes = [...formik.values.verificationCode];
    verificationCodes[index] = text;
    formik.setFieldValue("verificationCode", verificationCodes);
    if (
      text.length === 1 &&
      index < 3 &&
      verificationCodeInputsRef.current[index + 1]
    ) {
      verificationCodeInputsRef.current[index + 1]?.focus();
    }
  };

  const passwordInput = (
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
  );

  const verificationCodeInputs = formik.values.verificationCode.map(
    (code, index) => (
      <View style={styles.verificationCodeItem} key={index}>
        <Input
          onChangeText={(text) => handleChangeVerificationCode(index, text)}
          value={code}
          keyboardType="numeric"
          maxLength={1}
          style={styles.verificationCodeInput}
          ref={(ref: any) => {
            verificationCodeInputsRef.current[index] = ref;
          }}
        />
      </View>
    )
  );
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
      <View
        style={{
          height: 300,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Text h3 style={[styles.heading, { color: "white" }]}>
          BerberTakip
        </Text>
        <Text style={[styles.heading, { color: "lightgray" }]}>
          Kolayca berberinizden randevu alabilirsiniz
        </Text>
      </View>

      <View style={styles.card}>
        <Text h3 style={styles.heading}>
          Giriş Yap
        </Text>
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
        {formik.values.loginOption === "password" ? passwordInput : null}
        {formik.values.loginOption === "verificationCode" ? (
          <View style={styles.verificationCodeContainer}>
            {verificationCodeInputs}
          </View>
        ) : null}
        <View style={styles.buttonContainer}>
          <Button
            title="Şifreyle Giriş"
            onPress={() => formik.setFieldValue("loginOption", "password")}
            color={
              formik.values.loginOption === "password" ? "primary" : "gray"
            }
          />
          <Button
            title="Doğrulama Koduyla Giriş"
            onPress={() =>
              formik.setFieldValue("loginOption", "verificationCode")
            }
            color={
              formik.values.loginOption === "verificationCode"
                ? "primary"
                : "gray"
            }
          />
        </View>
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
        <TouchableOpacity style={styles.signupLink}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text>Hesabınız yok mu? </Text>
            <Link screen="Signup"> Kayıt Ol</Link>
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
  scrollViewContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f0f0f0", // Change this to your desired background color
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    width: "48%",
  },
  signupLink: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  verificationCodeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  verificationCodeItem: {
    flex: 1,
    alignItems: "center",
  },
  verificationCodeInput: {
    width: 40,
    textAlign: "center",
  },
});

export default SigninScreen;
