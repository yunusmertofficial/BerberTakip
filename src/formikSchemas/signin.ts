import * as Yup from "yup";

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

export default SigninSchema;
