import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Address, Coordinates } from "src/utils/locationUtils";

export interface LocationState {
  coordinates: Coordinates | null;
  address: Address | null;
}

// Define types for user state
interface UserState {
  userInfo: UserInfo | null;
  isSignedIn: boolean;
  location: LocationState;
}

// Define types for user info
interface UserInfo {
  _id: string;
  // Define properties of user info
}

const initialState: UserState = {
  userInfo: null,
  isSignedIn: false,
  location: {
    coordinates: null,
    address: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      state.isSignedIn = true;
    },
    setLocation: (state, action: PayloadAction<LocationState>) => {
      state.location.coordinates = action.payload.coordinates;
      state.location.address = action.payload.address;
    },
    clearUser: (state) => {
      state.userInfo = null;
      state.isSignedIn = false;
    },
  },
});

export const { setUser, clearUser, setLocation } = userSlice.actions;

export default userSlice.reducer;
