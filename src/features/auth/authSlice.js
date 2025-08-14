import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  register,
  verifyRegistration,
  forgotPassword as forgotPasswordThunk,
  resetPassword,
  changePassword,
  emailVerification,
  logoutUserThunk,
} from "./authThunks";

const token = localStorage.getItem("token");
const user = token ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
  user,
  token,
  loading: false,
  error: null,
  message: null,
  registrationId: null,
  otpVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.registrationId = null;
      state.otpVerified = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearMessage(state) {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // initiate register (send OTP)
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.registrationId = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationId = action.payload.registrationId;
        state.message =
          action.payload.message || "OTP sent to your phone/email";
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to initiate registration";
      })

      // verify OTP and complete registration
      .addCase(verifyRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(verifyRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.otpVerified = true;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(verifyRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "OTP verification failed";
      })

      // forgot password
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Reset link sent to email";
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to send reset link";
      })

      // reset password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Password reset successful";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to reset password";
      })

      // change password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message =
          action.payload.message || "Password changed successfully";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to change password";
      });
    builder
      .addCase(emailVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(emailVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.message =
          action.payload.message || "Email verification successful";
      })
      .addCase(emailVerification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to verify email";
      });

    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.error = action.payload || "Logout failed";
    });
  },
});

export const { logout, clearMessage } = authSlice.actions;

export default authSlice.reducer;
