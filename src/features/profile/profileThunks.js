import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile, updateProfile } from "../../features/auth/authApi";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getProfile();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const saveProfile = createAsyncThunk(
  "profile/saveProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const res = await updateProfile(profileData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
