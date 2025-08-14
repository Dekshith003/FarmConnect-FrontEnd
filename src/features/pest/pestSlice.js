import { createSlice } from "@reduxjs/toolkit";
import { fetchPestDetection } from "./pestThunks";

const initialState = {
  result: null,
  loading: false,
  error: null,
};

const pestSlice = createSlice({
  name: "pest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default pestSlice.reducer;
