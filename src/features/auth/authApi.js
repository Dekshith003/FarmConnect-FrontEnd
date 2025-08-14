import api from "../../services/api";
import { apiEndpoints } from "../../utils/Constants";

// Auth
export const loginUser = (credentials) =>
  api({
    method: apiEndpoints.auth.login.method,
    url: apiEndpoints.auth.login.url,
    data: credentials,
  });

export const registerUser = (userData) =>
  api({
    method: apiEndpoints.auth.register.method,
    url: apiEndpoints.auth.register.url,
    data: userData,
  });

export const verifyRegistrationApi = (data) =>
  api({
    method: apiEndpoints.auth.verifyRegistration.method,
    url: apiEndpoints.auth.verifyRegistration.url,
    data,
  });

export const forgotPassword = (email, role) =>
  api({
    method: apiEndpoints.auth.forgotPassword.method,
    url: apiEndpoints.auth.forgotPassword.url,
    data: { email, role },
  });

export const resetPassword = (data) =>
  api({
    method: apiEndpoints.auth.resetPassword.method,
    url: apiEndpoints.auth.resetPassword.url,
    data,
  });

export const changePassword = (data) =>
  api({
    method: apiEndpoints.auth.changePassword.method,
    url: apiEndpoints.auth.changePassword.url,
    data,
  });

export const logoutUser = () =>
  api({
    method: apiEndpoints.auth.logout.method,
    url: apiEndpoints.auth.logout.url,
  });

export const emailVerification = (data) =>
  api({
    method: apiEndpoints.auth.emailVerification.method,
    url: apiEndpoints.auth.emailVerification.url,
    data,
  });

// Profile
export const getProfile = () =>
  api({
    method: apiEndpoints.profile.getProfile.method,
    url: apiEndpoints.profile.getProfile.url,
  });

export const updateProfile = (profileData) =>
  api({
    method: apiEndpoints.profile.updateProfile.method,
    url: apiEndpoints.profile.updateProfile.url,
    data: profileData,
  });
