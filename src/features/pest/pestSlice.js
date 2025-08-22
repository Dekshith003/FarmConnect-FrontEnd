import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPestDetection,
  fetchPestHistory,
  fetchPestTreatment,
} from "./pestThunks";

const initialState = {
  result: null,
  loading: false,
  error: null,
  history: [],
  historyLoading: false,
  historyError: null,
  treatment: null,
  treatmentLoading: false,
  treatmentError: null,
};

const pestSlice = createSlice({
  name: "pest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle pest treatment recommendations
      .addCase(fetchPestTreatment.pending, (state) => {
        state.treatmentLoading = true;
        state.treatmentError = null;
      })
      .addCase(fetchPestTreatment.fulfilled, (state, action) => {
        state.treatmentLoading = false;
        state.treatment = action.payload;
      })
      .addCase(fetchPestTreatment.rejected, (state, action) => {
        state.treatmentLoading = false;
        state.treatmentError = action.payload || "Failed to fetch treatment";
      })
      .addCase(fetchPestDetection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPestDetection.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(fetchPestDetection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to detect pest";
      })

      // Handle pest detection history
      .addCase(fetchPestHistory.pending, (state) => {
        state.historyLoading = true;
        state.historyError = null;
      })
      .addCase(fetchPestHistory.fulfilled, (state, action) => {
        state.historyLoading = false;
        state.history = action.payload;
      })
      .addCase(fetchPestHistory.rejected, (state, action) => {
        state.historyLoading = false;
        state.historyError = action.payload || "Failed to fetch history";
      });
  },
});

export default pestSlice.reducer;
