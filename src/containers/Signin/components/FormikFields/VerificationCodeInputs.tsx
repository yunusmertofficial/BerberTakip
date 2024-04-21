import { Input } from "@rneui/themed";
import { FormikProps } from "formik";
import React, { useRef } from "react";
import { View } from "react-native";
import SignInFormValues from "../../../../types/FormValues/Auth/SignIn";

const VerificationCodeInputs = ({
  formik,
}: {
  formik: FormikProps<SignInFormValues>;
}) => {
  const verificationCodeInputsRef = useRef<Array<any | null>>([]);
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
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
      }}
    >
      {formik.values.verificationCode.map((code: any, index: number) => (
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
          key={index}
        >
          <Input
            onChangeText={(text) => handleChangeVerificationCode(index, text)}
            value={code}
            keyboardType="numeric"
            maxLength={1}
            style={{
              width: 40,
              textAlign: "center",
            }}
            ref={(ref: any) => {
              verificationCodeInputsRef.current[index] = ref;
            }}
          />
        </View>
      ))}
    </View>
  );
};

export default VerificationCodeInputs;
