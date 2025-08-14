import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile, saveProfile } from "./profileThunks";

const initialState = {
  profile: null,
  loading: false,
  error: null,
  success: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileMessage(state) {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch profile";
      })
      .addCase(saveProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.success = "Profile updated successfully";
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update profile";
      });
  },
});

export const { clearProfileMessage } = profileSlice.actions;
export default profileSlice.reducer;
