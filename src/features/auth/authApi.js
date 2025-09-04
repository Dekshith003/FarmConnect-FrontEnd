import axiosInstance from "../../services/axiosInstance";
import { apiEndpoints } from "../../utils/Constants";

export const registerAPI = (userData) =>
  axiosInstance.post(apiEndpoints.auth.register.url, userData);

export const loginAPI = (credentials) =>
  axiosInstance.post(apiEndpoints.auth.login.url, credentials);

export const forgotPasswordAPI = (email, role) =>
  axiosInstance.post(apiEndpoints.auth.forgotPassword.url, { email, role });

export const resetPasswordAPI = ({
  token,
  email,
  newPassword,
  confirmPassword,
}) =>
  axiosInstance.post(apiEndpoints.auth.resetPassword.url, {
    token,
    email,
    newPassword,
    confirmPassword,
  });

export const sendOtpAPI = ({ email }) =>
  axiosInstance.post(apiEndpoints.auth.emailVerification.url, { email });

export const verifyOtpAPI = ({ email, otp, role }) =>
  axiosInstance.post(apiEndpoints.auth.verifyRegistration.url, {
    email,
    otp,
    role,
  });

export const logoutAPI = () => axiosInstance.post(apiEndpoints.auth.logout.url);

export const getProfileAPI = () =>
  axiosInstance.get(apiEndpoints.profile.getProfile.url);

export const updateProfileAPI = (profileData) =>
  axiosInstance.put(apiEndpoints.profile.updateProfile.url, profileData);

export const changePasswordAPI = ({ currentPassword, newPassword }) =>
  axiosInstance.post(apiEndpoints.auth.changePassword.url, {
    currentPassword,
    newPassword,
  });
