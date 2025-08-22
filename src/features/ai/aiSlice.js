import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCropRecommendations,
  fetchPrediction,
  fetchRecommendations,
} from "./aiThunks";

// import { fetchCropRecommendations } from "./aiThunks";

const initialState = {
  cropRecommendations: {
    data: [],
    loading: false,
    error: null,
  },
  // buyerRecommendations removed
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
    // clearBuyerRecommendations removed
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
      .addCase(fetchCropRecommendations.pending, (state, action) => {
        state.cropRecommendations.loading = true;
        state.cropRecommendations.error = null;
        console.log("Fetching crop recommendations...", action.payload);
      })
      .addCase(fetchCropRecommendations.fulfilled, (state, action) => {
        state.cropRecommendations.loading = false;
        state.cropRecommendations.data = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchCropRecommendations.rejected, (state, action) => {
        state.cropRecommendations.loading = false;
        state.cropRecommendations.error = action.payload;
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
  // clearBuyerRecommendations removed
  clearPredictions,
  clearRecommendations,
} = aiSlice.actions;

export default aiSlice.reducer;
