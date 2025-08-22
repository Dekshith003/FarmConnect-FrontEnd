import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCurrentProfile,
  getProfileById,
  updateProfileApi,
} from "./profileApi";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (userId, { rejectWithValue }) => {
    try {
      // If userId is provided, fetch by id, else fetch current
      const res = userId
        ? await getProfileById(userId)
        : await getCurrentProfile();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const res = await updateProfileApi(profileData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
