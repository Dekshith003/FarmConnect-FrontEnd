import { createAsyncThunk } from "@reduxjs/toolkit";
import { aiApi } from "./aiApi";

// AI Crop Recommendations for Farmers
export const fetchCropRecommendations = createAsyncThunk(
  "ai/fetchCropRecommendations",
  async (data, { rejectWithValue }) => {
    try {
      const response = await aiApi.getCropRecommendations(data);
      console.log("Crop Recommendations API response:", response.data);
      return response.data.recommendations;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch crop recommendations"
      );
    }
  }
);

// AI Predictions
export const fetchPrediction = createAsyncThunk(
  "ai/fetchPrediction",
  async (input, { rejectWithValue }) => {
    try {
      const response = await aiApi.getPrediction(input);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch prediction"
      );
    }
  }
);

// AI General Recommendations
export const fetchRecommendations = createAsyncThunk(
  "ai/fetchRecommendations",
  async (context, { rejectWithValue }) => {
    try {
      const response = await aiApi.getRecommendations(context);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch recommendations"
      );
    }
  }
);
