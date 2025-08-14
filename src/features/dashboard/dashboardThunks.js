import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboard } from "./dashboardApi";

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getDashboard();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
