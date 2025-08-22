import axiosInstance from "../../services/axiosInstance";
import { apiEndpoints } from "../../utils/Constants";

export const aiApi = {
  // AI Crop Recommendations for Farmers
  getCropRecommendations: (data) =>
    axiosInstance({
      method: "POST",
      url: "/ai/recommend/crops",
      data: { context: data },
    }),

  getPrediction: (input) =>
    axiosInstance({
      method: "POST",
      url: "/ai/predict",
      data: { input },
    }),

  getRecommendations: (context) =>
    axiosInstance({
      method: "POST",
      url: "/ai/recommend",
      data: { context },
    }),
};
