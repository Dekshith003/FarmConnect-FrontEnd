import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginAPI,
  registerAPI,
  forgotPasswordAPI,
  resetPasswordAPI,
  sendOtpAPI,
  verifyOtpAPI,
  getProfileAPI,
  changePasswordAPI,
} from "./authApi";

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ currentPassword, newPassword }, thunkAPI) => {
    try {
      const res = await changePasswordAPI({ currentPassword, newPassword });
      return res.data.message || "Password changed successfully";
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Change password failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await loginAPI(credentials);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const res = await registerAPI(userData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      const res = await forgotPasswordAPI(email);
      return res.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Forgot password failed"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, thunkAPI) => {
    try {
      const res = await resetPasswordAPI(data);
      return res.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Reset password failed"
      );
    }
  }
);

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async ({ email }, thunkAPI) => {
    try {
      await sendOtpAPI({ email });
      return email;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Send OTP failed"
      );
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (details, thunkAPI) => {
    try {
      const res = await verifyOtpAPI(details);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Verify OTP failed"
      );
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, thunkAPI) => {
    try {
      const res = await getProfileAPI();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Get profile failed"
      );
    }
  }
);
