import axiosInstance from "../../services/axiosInstance";
import { apiEndpoints } from "../../utils/Constants";

export const getCrops = () =>
  axiosInstance({
    method: apiEndpoints.crop.getMyCrops.method,
    url: `${apiEndpoints.crop.getMyCrops.url}?t=${Date.now()}`,
  });

export const addCrop = (cropData) =>
  axiosInstance({
    method: apiEndpoints.crop.addCrop.method,
    url: apiEndpoints.crop.addCrop.url,
    data: cropData,
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteCrop = (id) =>
  axiosInstance({
    method: apiEndpoints.crop.deleteCrop.method,
    url: apiEndpoints.crop.deleteCrop.url.replace(":id", id),
  });

// Get crops for a specific farmer
export const getFarmerCrops = (farmerId) =>
  axiosInstance({
    method: "GET",
    url: `/crop/farmer/${farmerId}/crops?t=${Date.now()}`,
  });

export const toggleSoldApi = (id) =>
  axiosInstance({
    method: "PATCH",
    url: `/crop/${id}/sold`,
  });
