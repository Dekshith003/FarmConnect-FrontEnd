import api from "../../services/api";
import { apiEndpoints } from "../../utils/Constants";

export const getWeather = (location) => {
  let url = "/weather";
  if (location && location.lat && location.lon) {
    url += `?lat=${location.lat}&lon=${location.lon}`;
  }
  return api({
    method: "GET",
    url,
  });
};
