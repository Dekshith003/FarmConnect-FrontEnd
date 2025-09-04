import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProfile,
  updateProfile,
  createProfileThunk,
} from "./profileThunks";

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
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.success = "Profile updated successfully";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update profile";
      })
      .addCase(createProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.success = "Profile created successfully";
      })
      .addCase(createProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create profile";
      });
  },
});

export const { clearProfileMessage } = profileSlice.actions;
export default profileSlice.reducer;
