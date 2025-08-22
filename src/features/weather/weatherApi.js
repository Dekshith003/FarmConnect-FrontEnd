import axiosInstance from "../../services/axiosInstance";
import { apiEndpoints } from "../../utils/Constants";

export const getWeather = (location) => {
  let url = "/weather";
  if (location && location.lat && location.lon) {
    url += `?lat=${location.lat}&lon=${location.lon}`;
  }
  return axiosInstance({
    method: "GET",
    url,
  });
};
