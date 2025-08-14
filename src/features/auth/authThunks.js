import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  verifyRegistrationApi,
  forgotPassword as forgotPasswordApi,
  resetPassword as resetPasswordApi,
  changePassword as changePasswordApi,
  logoutUser as logoutUserApi,
  emailVerification as emailVerificationApi,
} from "./authApi";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      // Debug: Login attempt with credentials
      // console.log("Login attempt with credentials:", credentials);
      const res = await loginUser(credentials);
      // Debug: Login response
      // console.log("Login response:", res);
      return res.data;
    } catch (err) {
      // Error handling for production
      console.error("Login error:", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      // Debug: Registration attempt with data
      // console.log("Registration attempt with data:", userData);
      const res = await registerUser(userData);
      // Debug: Registration response
      // console.log("Registration response:", res);
      return res.data; // { registrationId, message }
    } catch (err) {
      // Error handling for production
      console.error("Registration error:", err);

      // Log specific validation errors for debugging
      if (err.response?.data?.errors) {
        Object.entries(err.response?.data?.errors).forEach(
          ([field, messages]) => {
            console.error(`Field ${field}:`, messages);
          }
        );
      }

      return rejectWithValue({
        message: err.response?.data?.message || "Registration failed",
        errors: err.response?.data?.errors || {},
        status: err.response?.status,
      });
    }
  }
);

export const verifyRegistration = createAsyncThunk(
  "auth/verifyRegistration",
  async (data, { rejectWithValue }) => {
    try {
      // Debug: Verify registration attempt with data
      // console.log("Verify registration attempt with data:", data);
      const res = await verifyRegistrationApi(data);
      // Debug: Verify registration response
      // console.log("Verify registration response:", res);
      return res.data; // { user, token }
    } catch (err) {
      // Error handling for production
      console.error("Verify registration error:", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email, role }, { rejectWithValue }) => {
    try {
      // Debug: Forgot password attempt
      // console.log("Forgot password attempt:", { email, role });
      const res = await forgotPasswordApi(email, role);
      // Debug: Forgot password response
      // console.log("Forgot password response:", res);
      return res.data;
    } catch (err) {
      // Error handling for production
      console.error("Forgot password error:", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, otp, role, newPassword }, { rejectWithValue }) => {
    try {
      // Debug: Reset password attempt
      // console.log("Reset password attempt:", { email, otp, role, newPassword });
      const res = await resetPasswordApi({
        email,
        otp,
        role,
        newPassword,
      });
      // Debug: Reset password response
      // console.log("Reset password response:", res);
      return res.data;
    } catch (err) {
      // Error handling for production
      console.error("Reset password error:", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      // Debug: Change password attempt
      // console.log("Change password attempt:", data);
      const res = await changePasswordApi(data);
      // Debug: Change password response
      // console.log("Change password response:", res);
      return res.data;
    } catch (err) {
      // Error handling for production
      console.error("Change password error:", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Debug: Logout attempt
      // console.log("Logout attempt");
      const res = await logoutUserApi();
      // Debug: Logout response
      // console.log("Logout response:", res);
      return res.data;
    } catch (err) {
      // Error handling for production
      console.error("Logout error:", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    // Debug: Initiating logout process
    // console.log("Initiating logout process");
    await dispatch(logoutUserThunk());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Debug: Logout completed
    // console.log("Logout completed - token and user removed from localStorage");
  }
);

export const emailVerification = createAsyncThunk(
  "auth/emailVerification",
  async (data, { rejectWithValue }) => {
    try {
      // Debug: Email verification attempt
      // console.log("Email verification attempt:", data);
      const res = await emailVerificationApi(data);
      // Debug: Email verification response
      // console.log("Email verification response:", res);
      return res.data;
    } catch (err) {
      // Error handling for production
      console.error("Email verification error:", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
