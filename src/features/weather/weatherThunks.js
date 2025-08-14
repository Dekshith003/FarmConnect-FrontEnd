import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWeather } from "./weatherApi";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (location, { rejectWithValue }) => {
    try {
      // location: { lat, lon }
      const res = await getWeather(location);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
