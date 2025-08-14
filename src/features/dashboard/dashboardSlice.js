import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboard } from "./dashboardThunks";

const initialState = {
  stats: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboardMessage(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch dashboard";
      });
  },
});

export const { clearDashboardMessage } = dashboardSlice.actions;
export default dashboardSlice.reducer;
