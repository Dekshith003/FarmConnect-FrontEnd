import { getPestTreatment } from "./pestApi";
// Thunk to fetch pest treatment recommendations
export const fetchPestTreatment = createAsyncThunk(
  "pest/fetchPestTreatment",
  async ({ pestName, labels, webEntities }, { rejectWithValue }) => {
    try {
      const res = await getPestTreatment({ pestName, labels, webEntities });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import { detectPest, getPestHistory } from "./pestApi";

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

// Thunk to fetch pest detection history from backend
export const fetchPestHistory = createAsyncThunk(
  "pest/fetchPestHistory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getPestHistory();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
