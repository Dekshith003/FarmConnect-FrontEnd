import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  sendOtp,
  verifyOtp,
  getProfile,
  changePassword,
} from "./authThunks";

const token = localStorage.getItem("token");
let user = null;
if (token) {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch (e) {
      user = null;
      // Optionally clear invalid user data
      localStorage.removeItem("user");
    }
  }
}

const initialState = {
  user,
  token,
  isAuthenticated: !!token,
  isLoading: {
    login: false,
    register: false,
    forgotPassword: false,
    resetPassword: false,
    sendOtp: false,
    verifyOtp: false,
    changePassword: false,
  },
  error: null,
  message: "",
  otpEmail: "",
  otpVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearAuthError: (state) => {
      state.error = null;
      state.message = "";
    },
    setOtpEmail: (state, action) => {
      state.otpEmail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading.login = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading.login = false;
        if (action.payload.userDetails) {
          const rawUser = action.payload.userDetails.user || {};
          const normalizedUser = {
            ...rawUser,
            _id: rawUser.id || rawUser._id || null,
            role: rawUser.userrole || rawUser.role || null,
          };
          state.user = normalizedUser;
          state.token = action.payload.userDetails.token;
          state.isAuthenticated = true;
          localStorage.setItem("token", action.payload.userDetails.token);
          localStorage.setItem("user", JSON.stringify(normalizedUser));
        } else {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading.login = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading.register = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading.register = false;
        state.message = action.payload.message || "Registration successful";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading.register = false;
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading.forgotPassword = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading.forgotPassword = false;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading.forgotPassword = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading.resetPassword = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading.resetPassword = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading.resetPassword = false;
        state.error = action.payload;
      })
      .addCase(sendOtp.pending, (state) => {
        state.isLoading.sendOtp = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.isLoading.sendOtp = false;
        state.otpEmail = action.payload;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.isLoading.sendOtp = false;
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading.verifyOtp = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading.verifyOtp = false;
        state.otpVerified = true;
        state.message = "OTP verified successfully";
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading.verifyOtp = false;
        state.error = action.payload;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(getProfile.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.isLoading.changePassword = true;
        state.error = null;
        state.message = "";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading.changePassword = false;
        state.message = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading.changePassword = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser, clearAuthError, setOtpEmail } = authSlice.actions;
export default authSlice.reducer;
