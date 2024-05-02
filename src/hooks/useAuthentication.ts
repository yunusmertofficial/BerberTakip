import { decode } from "base-64";
global.atob = decode;
import * as React from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import {
  clearUser as clearUserRedux,
  setUser,
} from "../../features/user/userSlice";

const useAuthentication = () => {
  const [loadingToken, setLoadingToken] = React.useState(true);
  const [error, setError] = React.useState(false);
  const dispatch = useDispatch();

  // Check user authentication status on app start
  React.useEffect(() => {
    checkToken();
  }, []);

  const clearUser = () => {
    dispatch(clearUserRedux());
    AsyncStorage.removeItem("token");
  };

  const checkToken = async () => {
    setLoadingToken(true);
    setError(false);

    try {
      const token = await AsyncStorage.getItem("token");
      //apiye istek atıp orada token kontrolü yapılabilir
      const isValidToken = token && typeof token === "string";

      if (isValidToken) {
        const decoded = jwtDecode(token);
        const expirationTime = Number(decoded.exp) * 1000;
        const currentTime = Date.now();
        if (expirationTime < currentTime) {
          clearUser();
        } else {
          dispatch(
            setUser({
              _id: decoded.sub as string,
            })
          );
        }
      } else {
        clearUser();
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoadingToken(false);
    }
  };

  return { loadingToken, error, checkToken };
};

export default useAuthentication;
