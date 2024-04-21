import * as Yup from "yup";
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
export default SignupSchema;
