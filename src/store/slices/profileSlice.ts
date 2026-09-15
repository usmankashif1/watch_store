import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { defaultProfile, type UserProfile } from "../../services/profileService";

const initialState: UserProfile = {
  ...defaultProfile,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (_state, action: PayloadAction<UserProfile>) => {
      return {
        ...action.payload,
      };
    },
    clearProfile: () => {
      return {
        ...defaultProfile,
      };
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
