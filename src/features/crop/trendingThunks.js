import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTrendingCrops } from "./trendingApi";

export const fetchTrendingCrops = createAsyncThunk(
  "crop/fetchTrendingCrops",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getTrendingCrops();
      return res.data.trending;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
