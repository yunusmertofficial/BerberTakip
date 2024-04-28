import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types for user state
interface UserState {
  userInfo: UserInfo | null;
  isSignedIn: boolean;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
}

// Define types for user info
interface UserInfo {
  _id: string;
  // Define properties of user info
}

const initialState: UserState = {
  userInfo: null,
  isSignedIn: false,
  coordinates: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      state.isSignedIn = true;
    },
    setLocation: (
      state,
      action: PayloadAction<{
        latitude: number;
        longitude: number;
      }>
    ) => {
      state.coordinates = {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    },
    clearUser: (state) => {
      state.userInfo = null;
      state.isSignedIn = false;
    },
  },
});

export const { setUser, clearUser, setLocation } = userSlice.actions;

export default userSlice.reducer;
