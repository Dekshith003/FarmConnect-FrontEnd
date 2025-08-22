import axiosInstance from "../../services/axiosInstance";
import { apiEndpoints } from "../../utils/Constants";

export function getDashboard() {
  return axiosInstance({
    method: apiEndpoints.dashboard.getDashboard.method,
    url: apiEndpoints.dashboard.getDashboard.url,
  });
}
