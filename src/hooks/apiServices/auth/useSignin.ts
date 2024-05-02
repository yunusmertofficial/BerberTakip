import { useState } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "@features/user/userSlice";

interface SignInFormValues {
  phoneNumber: string;
  password: string;
  loginOption: "password" | "verificationCode" | "";
  verificationCode: [string, string, string, string];
}

export const useSignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const signIn = async (userData: SignInFormValues) => {
    try {
      setLoading(true);
      /*       const response = await fetch("signInUrl", {
        method: "POST",
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Giriş yapılamadı.");
      } */
      const data = {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ",
      };
      const decoded = jwtDecode(data.token);
      await AsyncStorage.setItem("token", data.token);
      dispatch(
        setUser({
          _id: decoded.sub as string,
        })
      );
    } catch (error: any) {
      setError(error.message || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return {
    signIn,
    loading,
    error,
  };
};
