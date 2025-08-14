import api from "../../services/api";
import { apiEndpoints } from "../../utils/Constants";

export const aiApi = {
  // AI Crop Recommendations for Farmers
  getCropRecommendations: (data) =>
    api({
      method: "POST",
      url: "/ai/recommend/crop",
      data,
    }),

  // AI Buyer Recommendations for Customers
  getBuyerRecommendations: (data) =>
    api({
      method: "POST",
      url: "/ai/recommend/buyer",
      data,
    }),

  // AI Predictions
  getPrediction: (input) =>
    api({
      method: "POST",
      url: "/ai/predict",
      data: { input },
    }),

  // AI General Recommendations
  getRecommendations: (context) =>
    api({
      method: "POST",
      url: "/ai/recommend",
      data: { context },
    }),
};
