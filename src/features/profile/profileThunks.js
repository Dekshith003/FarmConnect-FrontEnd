import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfileById, updateProfileApi, createProfile } from "./profileApi";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getProfileById();
      console.log(res.data);
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

export const createProfileThunk = createAsyncThunk(
  "profile/createProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const res = await createProfile(profileData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
