interface SignInFormValues {
  phoneNumber: string;
  password: string;
  loginOption: "password" | "verificationCode" | "";
  verificationCode: [string, string, string, string];
}

export default SignInFormValues;
