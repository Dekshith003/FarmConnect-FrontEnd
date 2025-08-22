import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCrops,
  createCrop,
  removeCrop,
  fetchFarmerCrops,
} from "./cropThunks";
import { fetchTrendingCrops } from "./trendingThunks";

const initialState = {
  crops: [],
  trending: [],
  loading: false,
  error: null,
  success: null,
};

const cropSlice = createSlice({
  name: "crop",
  initialState,
  reducers: {
    clearCropMessage(state) {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingCrops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingCrops.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload;
      })
      .addCase(fetchTrendingCrops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch trending crops";
      })
      .addCase(fetchCrops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCrops.fulfilled, (state, action) => {
        state.loading = false;
        // If payload is { crops: [...] }, store crops array
        state.crops = Array.isArray(action.payload)
          ? action.payload
          : Array.isArray(action.payload?.crops)
          ? action.payload.crops
          : [];
      })
      .addCase(fetchCrops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch crops";
      })

      // Handle fetchFarmerCrops
      .addCase(fetchFarmerCrops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFarmerCrops.fulfilled, (state, action) => {
        state.loading = false;
        state.crops = Array.isArray(action.payload)
          ? action.payload
          : Array.isArray(action.payload?.crops)
          ? action.payload.crops
          : [];
      })
      .addCase(fetchFarmerCrops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch crops";
      })
      .addCase(createCrop.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createCrop.fulfilled, (state, action) => {
        state.loading = false;
        if (!Array.isArray(state.crops)) {
          state.crops = [action.payload];
        } else {
          state.crops.push(action.payload);
        }
        state.success = "Crop added successfully";
      })
      .addCase(createCrop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add crop";
      })

      .addCase(removeCrop.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(removeCrop.fulfilled, (state, action) => {
        state.loading = false;
        state.crops = state.crops.filter((crop) => crop._id !== action.payload);
        state.success = "Crop deleted successfully";
      })
      .addCase(removeCrop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete crop";
      });
  },
});

export const { clearCropMessage } = cropSlice.actions;
export default cropSlice.reducer;
