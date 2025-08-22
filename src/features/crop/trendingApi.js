import axiosInstance from "../../services/axiosInstance";

export const getTrendingCrops = () =>
  axiosInstance({
    method: "GET",
    url: "/trending",
  });
