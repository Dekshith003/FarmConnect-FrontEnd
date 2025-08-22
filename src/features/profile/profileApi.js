import axiosInstance from "../../services/axiosInstance";

// Get profile by userId
export const getProfileById = (userId) =>
  axiosInstance.get(`/profile/${userId}`);

// Fetch or create profile by userId (robust, recommended)
export const fetchOrCreateProfile = (userId, profileData) =>
  axiosInstance.post(`/profile/fetch-or-create/${userId}`, profileData);

export const updateProfileApi = (profileData) =>
  axiosInstance.put(`/profile`, profileData);

// Get current user's profile
export const getCurrentProfile = () => axiosInstance.get(`/profile`);

// Delete current user's profile
export const deleteProfile = () => axiosInstance.delete(`/profile`);
