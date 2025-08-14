import { createAsyncThunk } from "@reduxjs/toolkit";
import { aiApi } from "./aiApi";

// AI Crop Recommendations for Farmers
export const fetchCropRecommendations = createAsyncThunk(
  "ai/fetchCropRecommendations",
  async (data, { rejectWithValue }) => {
    try {
      const response = await aiApi.getCropRecommendations(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch crop recommendations"
      );
    }
  }
);

// AI Buyer Recommendations for Customers
export const fetchBuyerRecommendations = createAsyncThunk(
  "ai/fetchBuyerRecommendations",
  async (data, { rejectWithValue }) => {
    try {
      const response = await aiApi.getBuyerRecommendations(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch buyer recommendations"
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
