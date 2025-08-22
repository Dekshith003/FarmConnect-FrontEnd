// Get pest treatment recommendations from backend
export function getPestTreatment({ pestName, labels, webEntities }) {
  return axiosInstance.post("/treatment", { pestName, labels, webEntities });
}
import axiosInstance from "../../services/axiosInstance";

export function detectPest(formData) {
  return axiosInstance({
    method: "POST",
    url: "/pest/detect",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// Fetch pest detection history from backend
export function getPestHistory() {
  return axiosInstance({
    method: "GET",
    url: `/pest/history?t=${Date.now()}`,
  });
}
