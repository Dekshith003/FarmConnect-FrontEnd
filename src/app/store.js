import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import cropReducer from "../features/crop/cropSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import weatherReducer from "../features/weather/weatherSlice";
import pestReducer from "../features/pest/pestSlice";
import aiReducer from "../features/ai/aiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    crop: cropReducer,
    dashboard: dashboardReducer,
    weather: weatherReducer,
    pest: pestReducer,
    ai: aiReducer,
  },
});
