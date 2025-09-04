import axiosInstance from "../../services/axiosInstance";

// Helper to get id and role from localStorage
function getUserDetailsFromLocalStorage() {
  const userDetails = JSON.parse(localStorage.getItem("user"))?.userDetails;
  return {
    id: userDetails?.id,
    role: userDetails?.role || userDetails?.userrole || "Farmer",
  };
}

// Get profile by id and role
export const getProfileById = () => {
  const { id, role } = getUserDetailsFromLocalStorage();
  console.log("Fetching profile for ID:", id, "with role:", role);
  return axiosInstance.get(`/profile/${id}?role=${role}`);
};

// Create profile by id and role
export const createProfile = (profileData) => {
  const { id, role } = getUserDetailsFromLocalStorage();
  return axiosInstance.post(`/profile/${id}?role=${role}`, profileData);
};

export const updateProfileApi = (profileData) => {
  const formData = new FormData();
  Object.entries(profileData).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return axiosInstance.put(`/profile`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
