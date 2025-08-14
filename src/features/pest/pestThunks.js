import { createAsyncThunk } from "@reduxjs/toolkit";
import { detectPest } from "./pestApi";

export const fetchPestDetection = createAsyncThunk(
  "pest/fetchPestDetection",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await detectPest(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
