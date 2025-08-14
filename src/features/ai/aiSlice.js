import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCropRecommendations,
  fetchBuyerRecommendations,
  fetchPrediction,
  fetchRecommendations,
} from "./aiThunks";

const initialState = {
  cropRecommendations: {
    data: [],
    loading: false,
    error: null,
  },
  buyerRecommendations: {
    data: [],
    loading: false,
    error: null,
  },
  predictions: {
    data: null,
    loading: false,
    error: null,
  },
  generalRecommendations: {
    data: null,
    loading: false,
    error: null,
  },
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    clearCropRecommendations: (state) => {
      state.cropRecommendations.data = [];
      state.cropRecommendations.error = null;
    },
    clearBuyerRecommendations: (state) => {
      state.buyerRecommendations.data = [];
      state.buyerRecommendations.error = null;
    },
    clearPredictions: (state) => {
      state.predictions.data = null;
      state.predictions.error = null;
    },
    clearRecommendations: (state) => {
      state.generalRecommendations.data = null;
      state.generalRecommendations.error = null;
    },
  },
  extraReducers: (builder) => {
    // Crop Recommendations
    builder
      .addCase(fetchCropRecommendations.pending, (state) => {
        state.cropRecommendations.loading = true;
        state.cropRecommendations.error = null;
      })
      .addCase(fetchCropRecommendations.fulfilled, (state, action) => {
        state.cropRecommendations.loading = false;
        state.cropRecommendations.data = action.payload;
      })
      .addCase(fetchCropRecommendations.rejected, (state, action) => {
        state.cropRecommendations.loading = false;
        state.cropRecommendations.error = action.payload;
      });

    // Buyer Recommendations
    builder
      .addCase(fetchBuyerRecommendations.pending, (state) => {
        state.buyerRecommendations.loading = true;
        state.buyerRecommendations.error = null;
      })
      .addCase(fetchBuyerRecommendations.fulfilled, (state, action) => {
        state.buyerRecommendations.loading = false;
        state.buyerRecommendations.data = action.payload;
      })
      .addCase(fetchBuyerRecommendations.rejected, (state, action) => {
        state.buyerRecommendations.loading = false;
        state.buyerRecommendations.error = action.payload;
      });

    // Predictions
    builder
      .addCase(fetchPrediction.pending, (state) => {
        state.predictions.loading = true;
        state.predictions.error = null;
      })
      .addCase(fetchPrediction.fulfilled, (state, action) => {
        state.predictions.loading = false;
        state.predictions.data = action.payload;
      })
      .addCase(fetchPrediction.rejected, (state, action) => {
        state.predictions.loading = false;
        state.predictions.error = action.payload;
      });

    // General Recommendations
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.generalRecommendations.loading = true;
        state.generalRecommendations.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.generalRecommendations.loading = false;
        state.generalRecommendations.data = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.generalRecommendations.loading = false;
        state.generalRecommendations.error = action.payload;
      });
  },
});

export const {
  clearCropRecommendations,
  clearBuyerRecommendations,
  clearPredictions,
  clearRecommendations,
} = aiSlice.actions;

export default aiSlice.reducer;
